(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-usertype-usertype-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/usertype/usertypeadd.component.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/usertype/usertypeadd.component.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <!--<div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-9 mt-3\">\r\n          <span class=\"dash\">Manage User Type</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/userTypelist\">Manage User Type</a></li>\r\n            <li class=\"breadcrumb-item active\">{{pageTitle}}</li>\r\n          </ul>\r\n        </div>\r\n        <div class=\"col-md-3 mt-4 text-right\">\r\n          <button class=\"w-auto sw-100 btn btn-dark\" (click)=\"close()\"><i class=\"fa fa-arrow-left\"></i>&nbsp;Back</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>-->\r\n  <div class=\"header float-left w-100 mb-2\">\r\n    <h2 class=\"float-left pr-2\"><strong>Manage User Type</strong></h2>\r\n    <div class=\"breadcrumb-wrapper\">\r\n      <ol class=\"breadcrumb\">\r\n        <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n        <li><a routerLink=\"/userTypelist\">Manage User Type</a></li>\r\n        <li class=\"active\">{{pageTitle}}</li>\r\n      </ol>\r\n    </div>\r\n\r\n  </div>\r\n  <div class=\"clearfix\"></div>\r\n\r\n  <div class=\"panel\">\r\n    <div class=\"panel-content\">\r\n      <form [formGroup]=\"userTypeForm\" autocomplete=\"off\">\r\n        <div class=\"userType-box\" [ngClass]=\"{'disabled':loadSave}\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12 col-lg-4\">\r\n              <label>User Type:<span class=\"text-danger\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Please enter User Type\"\r\n                       formControlName=\"userType\" [ngClass]=\"{'is-invalid': (userType.invalid && (userType.dirty || userType.touched) && (userType.errors?.required || userType.errors?.maxlength)) }\">\r\n\r\n\r\n                <small *ngIf=\"userType.invalid && (userType.dirty || userType.touched) && userType.errors?.required\"\r\n                       class=\"text-danger\">User Type is required</small>\r\n                <small *ngIf=\"userType.invalid && (userType.dirty || userType.touched) && userType.errors?.maxlength\"\r\n                       class=\"text-danger\">User Type must be less than 50 characters.</small>\r\n              </div>\r\n            </div>\r\n            <!--<div class=\"col-md-12 col-lg-4\">\r\n              <label>Status:<span style=\"color:red\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"statuses\" [loading]=\"loadSave\" [closeOnSelect]=\"true\" placeholder=\"Select status\" formControlName=\"userTypeStatusId\"\r\n                           bindLabel=\"text\" bindValue=\"valueGuid\"\r\n                           [ngClass]=\"{'is-invalid': (userTypeStatusId.invalid && (userTypeStatusId.dirty || userTypeStatusId.touched) && userTypeStatusId.errors?.required) }\"></ng-select>\r\n                <small *ngIf=\"userTypeStatusId.invalid && (userTypeStatusId.dirty || userTypeStatusId.touched) && userTypeStatusId.errors?.required\"\r\n                       style=\"color:red;\">Please select Status</small>\r\n              </div>\r\n            </div>-->\r\n            <div class=\"col-md-12 col-lg-4\">\r\n              <label>Description:</label>\r\n              <div class=\"form-group\">\r\n                <textarea type=\"text\" style=\"height:38px;\" class=\"form-control\" formControlName=\"userTypeDescription\" [ngClass]=\"{'is-invalid': (userTypeDescription.invalid && (userTypeDescription.dirty || userTypeDescription.touched) && (userTypeDescription.errors?.required || userTypeDescription.errors?.maxlength)) }\"></textarea>\r\n                <small *ngIf=\"userTypeDescription.invalid && (userTypeDescription.dirty || userTypeDescription.touched) && userTypeDescription.errors?.required\"\r\n                       class=\"text-danger\">Description is required</small>\r\n                <small *ngIf=\"userTypeDescription.invalid && (userTypeDescription.dirty || userTypeDescription.touched) && userTypeDescription.errors?.maxlength\"\r\n                       class=\"text-danger\">Description must be less than 1000 characters</small>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-group usert-nottf\">\r\n          <h3 _ngcontent-c1=\"\" class=\"form-heading ng-star-inserted ml-0\"><span _ngcontent-c1=\"\">Access Level </span></h3>\r\n          <!--<ng-container *ngFor=\"let m of modulelist\">\r\n            <h3 class=\"form-heading mt-0\" style=\"background:#f1f1f1\">{{m.module_name}}</h3>\r\n            <div class=\"col-md-12 col-lg-8\" *ngFor=\"let s of m.listoptions\">\r\n              <div class=\"custom-control custom-checkbox\">\r\n                <input type=\"checkbox\" formControlName=\"checkboxdata\" class=\"custom-control-input\" [id]=\"s.sub_module_id\" [checked]=\"s.HasModule\" (change)=\"onChange(s.sub_module_id,$event)\" name=\"example1\">\r\n                <label class=\"custom-control-label\" [for]=\"s.sub_module_id\">{{s.sub_module_name}}</label>\r\n\r\n\r\n\r\n\r\n\r\n              </div>\r\n\r\n\r\n\r\n            </div>\r\n          </ng-container>-->\r\n          <div class=\"table-responsive\">\r\n            <table class=\"table\">\r\n              <ng-container *ngFor=\"let m of modulelist\">\r\n                <thead>\r\n                  <tr style=\"background:#f1f1f1\">\r\n                    <th>\r\n                      {{m.module_name}}\r\n                    </th>\r\n                    <th>\r\n                      <!--<div class=\"custom-control custom-checkbox\">\r\n                        <input type=\"checkbox\" id=\"customCheck\" class=\"custom-control-input\" value=\"add\"  (click)=\"enableSelectAll($event)\" />\r\n                        <label class=\"custom-control-label\" for=\"customCheck\"></label>\r\n                      </div>-->\r\n                    </th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr *ngFor=\"let s of m.listoptions\">\r\n                    <td>\r\n                      {{s.sub_module_name}}\r\n                    </td>\r\n                    <td class=\"text-center\">\r\n                      <div class=\"custom-control custom-checkbox custom-control-inline\">\r\n                        <input type=\"checkbox\" formControlName=\"checkboxdata\" class=\"custom-control-input\" [id]=\"s.sub_module_id\" [checked]=\"s.HasModule\" (change)=\"onChange(s.sub_module_id,$event)\" name=\"example1\">\r\n                        <label class=\"custom-control-label\" [for]=\"s.sub_module_id\"></label>\r\n                      </div>\r\n                    </td>\r\n\r\n                  </tr>\r\n\r\n                </tbody>\r\n              </ng-container>\r\n            </table>\r\n          </div>\r\n\r\n\r\n        </div>\r\n        <div class=\"row mb-3\">\r\n          <div class=\"col-sm-12 col-md-12\">\r\n            <a href=\"javascript:void(0);\" class=\"btn btn-success mr-1\" (click)=\"save()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n            <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n          </div>\r\n        </div>\r\n      </form>\r\n    </div>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/usertype/usertypelist.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/usertype/usertypelist.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Manage User Type</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage User Type</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3\">\r\n        <div class=\"row mt-2\">\r\n          <!--<div class=\"col-md-6\">\r\n    <div class=\"searchfield  mr-1\">\r\n      <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By User type\" (keyup)='updateFilter($event)'><button type=\"button\" (click)=\"search()\" ><i class=\"fa fa-search\"></i></button>\r\n      <ng-select #userTypeSelect [items]=\"lstUserType\"\r\n                 placeholder=\"Select User Type\" bindValue=\"value\" bindLabel=\"text\"\r\n                 [closeOnSelect]=\"true\"\r\n                 (change)=\"SetUserType($event.value)\" (clear)=\"restddl()\">\r\n      </ng-select>\r\n    </div>\r\n    <a class=\"btn btn-white mr-1\" href=\"javascript:void(0);\"><span><i class=\"fa fa-filter\"></i> Filter</span></a>\r\n    <a class=\"btn btn-white\" href=\"javascript:void(0);\"><span><i class=\"fa fa-list-alt\"></i> List Layout</span></a>\r\n  </div>-->\r\n          <div class=\"col-md-12 col-xl-6\">\r\n            <div class=\"row searchfield mr-1 w-100\">\r\n              <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By User type\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-lg-8 float-left\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\"><span><i class=\"fa fa-search\"></i> Search</span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\"><span><i class=\"fa fa-refresh\"></i> Reset</span></a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-6\">\r\n            <div class=\"dt-buttons\">\r\n              <!--<a *ngIf='modulePermission!==null && modulePermission.roleModuleAddFlag' class=\"btn btn-success mr-1\" routerLink=\"/userTypelist/AdduserType\"><span><i class=\"fa fa-plus\"></i> Add User Type</span></a>-->\r\n              <!--<a class=\"btn btn-secondary mr-1\" href=\"#\"><span><i class=\"fa fa-download\"></i> Import</span></a>\r\n    <a class=\"btn btn-dark mr-1\" href=\"#\"><span><i class=\"fa fa-exchange\"></i> Transfer</span></a>\r\n    <a class=\"btn btn-danger\" href=\"#\"><span><i class=\"fa fa-trash\"></i> Delete</span></a>-->\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <div class=\"panel-content px-3  pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rows]=\"pagedData.data\"\r\n                       [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                       [columnMode]=\"'force'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       \r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"pagedData.pager.totalItems\"\r\n                       [offset]=\"pagedData.pager.currentPage\"\r\n                       [limit]=\"pagedData.pager.pageSize\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\">\r\n          <ngx-datatable-column name=\"User Type\" prop=\"MasterValue\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <!--<div><a [routerLink]=\"['/userTypelist/edituserType',row.MasterId]\">{{row.MasterValue}}</a></div>-->\r\n              <div><a>{{row.MasterValue}}</a></div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-column name=\"Description\" prop=\"MasterDescription\" [sortable]=\"false\"></ngx-datatable-column>\r\n\r\n\r\n          <!--<ngx-datatable-column name=\"IsActive\" [sortable]=\"true\" headerClass=\"text-center\"  *ngIf='modulePermission!==null && modulePermission.roleModuleUpdateFlag' [maxWidth]=\"100\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template >\r\n              <div class=\"text-center\">\r\n                <a *ngIf=\"row.MasterStatusId.toUpperCase() == '1F741CF9-62BC-468B-B64A-8CFA8B48598B'\" href=\"javascript:void(0);\"><i class=\"fa fa-times text-danger icon_tick\"></i></a>\r\n                <a *ngIf=\"row.MasterStatusId.toUpperCase() == 'D69986C3-F743-46C1-BE0A-6F397D1AB931'\" href=\"javascript:void(0);\"><i class=\"fa fa-check text-success icon_tick\"></i></a>\r\n              </div>\r\n              <div *ngIf=\"loginuserid===row.Id\" class=\"align-center\">\r\n                <label>-</label>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>-->\r\n\r\n\r\n          <ngx-datatable-column [width]=\"80\" name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\" *ngIf='modulePermission!==null && isDelete' [maxWidth]=\"100\" headerClass=\"text-center\">\r\n            <!--<ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n    <div class=\"text-center\">\r\n      <a href=\"javascript:void(0);\" (click)=\"DeleteUser(row)\" class=\"btn-delete\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n    </div>\r\n     <div *ngIf=\"loginuserid===row.Id\" class=\"align-center\">\r\n        <label>-</label>\r\n      </div>\r\n  </ng-template>-->\r\n\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div class=\"text-center\">\r\n                <a [routerLink]=\"['/userTypelist/edituserType',row.MasterId]\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                <a title=\"Click to delete.\" (click)=\"DeleteUser(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n              </div>\r\n              <div *ngIf=\"loginuserid===row.Id\" class=\"align-center\">\r\n                <label>-</label>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"currentPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div class=\"page-count\">\r\n                {{rowCount}} total\r\n              </div>\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                               [page]=\"pagedData.pager.currentPage+1\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"pagedData.pager.totalItems\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/views/usertype/usertype-routing.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/usertype/usertype-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: UserTypeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserTypeRoutingModule", function() { return UserTypeRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _usertypelist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./usertypelist.component */ "./src/app/views/usertype/usertypelist.component.ts");
/* harmony import */ var _usertypeadd_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./usertypeadd.component */ "./src/app/views/usertype/usertypeadd.component.ts");
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
    { path: '', component: _usertypelist_component__WEBPACK_IMPORTED_MODULE_2__["UsertypelistComponent"] },
    { path: 'AdduserType', component: _usertypeadd_component__WEBPACK_IMPORTED_MODULE_3__["UsertypeaddComponent"] },
    { path: 'edituserType/:id', component: _usertypeadd_component__WEBPACK_IMPORTED_MODULE_3__["UsertypeaddComponent"] }
];
var UserTypeRoutingModule = /** @class */ (function () {
    function UserTypeRoutingModule() {
    }
    UserTypeRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], UserTypeRoutingModule);
    return UserTypeRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/usertype/usertype.module.ts":
/*!***************************************************!*\
  !*** ./src/app/views/usertype/usertype.module.ts ***!
  \***************************************************/
/*! exports provided: UserTypeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserTypeModule", function() { return UserTypeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _usertype_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./usertype-routing.module */ "./src/app/views/usertype/usertype-routing.module.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_password_toggle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-password-toggle */ "./node_modules/ngx-password-toggle/ngx-password-toggle.umd.js");
/* harmony import */ var ngx_password_toggle__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(ngx_password_toggle__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _usertypelist_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./usertypelist.component */ "./src/app/views/usertype/usertypelist.component.ts");
/* harmony import */ var _usertypeadd_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./usertypeadd.component */ "./src/app/views/usertype/usertypeadd.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};











var UserTypeModule = /** @class */ (function () {
    function UserTypeModule() {
    }
    UserTypeModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_usertypelist_component__WEBPACK_IMPORTED_MODULE_8__["UsertypelistComponent"], _usertypeadd_component__WEBPACK_IMPORTED_MODULE_9__["UsertypeaddComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _usertype_routing_module__WEBPACK_IMPORTED_MODULE_3__["UserTypeRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectModule"], ngx_password_toggle__WEBPACK_IMPORTED_MODULE_7__["NgxPasswordToggleModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["NgxDatatableModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"]
            ]
        })
    ], UserTypeModule);
    return UserTypeModule;
}());



/***/ }),

/***/ "./src/app/views/usertype/usertypeadd.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/views/usertype/usertypeadd.component.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3VzZXJ0eXBlL3VzZXJ0eXBlYWRkLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/usertype/usertypeadd.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/views/usertype/usertypeadd.component.ts ***!
  \*********************************************************/
/*! exports provided: UsertypeaddComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsertypeaddComponent", function() { return UsertypeaddComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _usertypeservice_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./usertypeservice.service */ "./src/app/views/usertype/usertypeservice.service.ts");
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






var UsertypeaddComponent = /** @class */ (function () {
    function UsertypeaddComponent(fb, commonService, router, toaster, route, userTypeService) {
        this.fb = fb;
        this.commonService = commonService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.userTypeService = userTypeService;
        this.loading = false;
        this.loadSave = false;
        this.userTypeModel = new _usertypeservice_service__WEBPACK_IMPORTED_MODULE_5__["UserType"]();
        this.submodulelist = [];
        this.selected = [];
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
    }
    UsertypeaddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isDisabled = null;
        this.selected = [];
        this.initForm();
        this.getStatuses();
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
                _this.loading = true;
                _this.GetModuleSubmoduleList(id);
                _this.fillForm(id);
            }
            else {
                _this.pageTitle = 'Add User Type';
            }
        });
    };
    Object.defineProperty(UsertypeaddComponent.prototype, "userType", {
        get: function () { return this.userTypeForm.get('userType'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UsertypeaddComponent.prototype, "userTypeStatusId", {
        get: function () { return this.userTypeForm.get('userTypeStatusId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UsertypeaddComponent.prototype, "checkboxdata", {
        get: function () { return this.userTypeForm.get('checkboxdata'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UsertypeaddComponent.prototype, "userTypeDescription", {
        get: function () { return this.userTypeForm.get('userTypeDescription'); },
        enumerable: true,
        configurable: true
    });
    UsertypeaddComponent.prototype.getStatuses = function () {
        var _this = this;
        this.commonService.getMasterItemsList("Status").subscribe(function (response) {
            _this.statuses = _this.commonService.masters;
        });
    };
    UsertypeaddComponent.prototype.GetModuleSubmoduleList = function (id) {
        var _this = this;
        this.userTypeService.GetModuleSubmoduleList(id).subscribe(function (response) {
            _this.modulelist = JSON.parse(response);
            console.log('modulelist', _this.modulelist);
            _this.selectedid = _this.modulelist[0].selected;
            _this.submoduleid = _this.modulelist[0].selected;
            _this.selected = _this.selectedid.split(',').map(function (item) {
                return parseInt(item, 10);
            });
            ////var data = this.modulelist[0].listoptions;
            //this.modulelist.forEach(c => {
            //  this.submodulelist.push(JSON.parse(c.listoptions));
            //})   
            //   console.log('submodulelist', this.submodulelist)
            // console.log('data', data)
        });
    };
    UsertypeaddComponent.prototype.setData = function (value) {
        this.userTypeStatusId.setValue(value.ValueGuid);
    };
    UsertypeaddComponent.prototype.initForm = function () {
        this.userTypeForm = this.fb.group({
            userTypeId: [null],
            userid: [null],
            checkboxdata: [null],
            userType: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(50)]],
            userTypeStatusId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            userTypeDescription: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(1000)]]
        });
    };
    UsertypeaddComponent.prototype.save = function () {
        var _this = this;
        console.log(this.userTypeForm.value);
        if (this.userTypeForm.valid) {
            this.loadSave = true;
            this.userTypeModel.MasterId = this.userTypeForm.value.userid;
            this.userTypeModel.MasterValue = this.userTypeForm.value.userType;
            this.userTypeModel.MasterStatusId = this.userTypeForm.value.userTypeStatusId;
            this.userTypeModel.MasterDescription = this.userTypeForm.value.userTypeDescription;
            this.userTypeModel.subModuleid = this.submoduleid;
            this.userTypeService.addeditUserType(this.userTypeModel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.router.navigateByUrl("/userTypelist");
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
            this.commonService.validateAllFormFields(this.userTypeForm);
        }
    };
    UsertypeaddComponent.prototype.close = function () {
        this.router.navigate(['/userTypelist']);
    };
    UsertypeaddComponent.prototype.fillForm = function (id) {
        var _this = this;
        this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
        this.userTypeService.getUserTypeDetail(id).subscribe(function (result) {
            if (result) {
                //if (typeof result.userType !== 'undefined' && result.userType !== null) {
                //  this.getRolesByUserType(result.userType);
                //}
                // this.userTypeId = result.userType;     
                _this.pageTitle = 'Edit User Type: ' + result.masterValue;
                _this.loadSave = false;
                _this.statusId = result.masterStatusId;
                // console.log("resukt", result.masterStatusId);
                _this.userTypeForm.patchValue({
                    userid: result.masterId,
                    userType: result.masterValue,
                    userTypeStatusId: result.masterStatusId,
                    userTypeDescription: result.masterDescription
                });
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    UsertypeaddComponent.prototype.onChange = function (Id, event) {
        var checked = event.target.checked;
        // console.log('selected1232', this.selected);
        if (checked) {
            this.selected.push(Id);
        }
        else {
            var index = this.selected.indexOf(Id);
            this.selected.splice(index, 1);
        }
        this.values = this.selected.toString();
        var count = this.selected.length;
        this.count = count;
        console.log('selected', this.selected.toString());
        this.submoduleid = this.selected.toString();
        console.log(' this.submoduleid', this.submoduleid);
    };
    UsertypeaddComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _usertypeservice_service__WEBPACK_IMPORTED_MODULE_5__["UsertypeserviceService"] }
    ]; };
    UsertypeaddComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-usertypeadd',
            template: __importDefault(__webpack_require__(/*! raw-loader!./usertypeadd.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/usertype/usertypeadd.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./usertypeadd.component.scss */ "./src/app/views/usertype/usertypeadd.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _usertypeservice_service__WEBPACK_IMPORTED_MODULE_5__["UsertypeserviceService"]])
    ], UsertypeaddComponent);
    return UsertypeaddComponent;
}());



/***/ }),

/***/ "./src/app/views/usertype/usertypelist.component.scss":
/*!************************************************************!*\
  !*** ./src/app/views/usertype/usertypelist.component.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3VzZXJ0eXBlL3VzZXJ0eXBlbGlzdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/usertype/usertypelist.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/usertype/usertypelist.component.ts ***!
  \**********************************************************/
/*! exports provided: UsertypelistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsertypelistComponent", function() { return UsertypelistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _usertypeservice_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./usertypeservice.service */ "./src/app/views/usertype/usertypeservice.service.ts");
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






var UsertypelistComponent = /** @class */ (function () {
    function UsertypelistComponent(usertypeserviceService, dialogService, commonService, router, activeRoute, toaster) {
        var _this = this;
        this.usertypeserviceService = usertypeserviceService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.searchUserType = '';
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'CreatedOn';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.loadSave = false;
        this.commonService.getMasterItemsList("usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'USERTYPEADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'USERTYPEUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'USERTYPEDELETE'; });
        if (deletedata == undefined) {
            deletedata = "null";
        }
        else {
            this.isDelete = true;
        }
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    UsertypelistComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.refresh();
    };
    UsertypelistComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.usertypeserviceService.GetUserTypeList(this.listFilter, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.usertypeserviceService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    UsertypelistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    UsertypelistComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.usertypeserviceService.GetUserTypeList(this.listFilter, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.usertypeserviceService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    UsertypelistComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.loading = true;
        this.usertypeserviceService.GetUserTypeList(this.listFilter, this.searchUserType, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.usertypeserviceService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    UsertypelistComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    UsertypelistComponent.prototype.search = function () {
        var _this = this;
        this.loading = true;
        this.usertypeserviceService.GetUserTypeList(this.listFilter, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.usertypeserviceService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    UsertypelistComponent.prototype.reset = function () {
        var _this = this;
        this.loading = true;
        this.listFilter = '';
        this.searchUserType = '';
        this.sortDir = 'desc';
        this.sortColumn = 'CreatedOn';
        this.pageSizeValue = 10;
        this.usertypeserviceService.GetUserTypeList(this.listFilter, '', this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.usertypeserviceService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    UsertypelistComponent.prototype.DeleteUser = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete user type \"" + row.MasterValue + "\"?";
        this.dialogService.confirm('Delete user type ', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.usertypeserviceService.deleteUserType(row.MasterId).subscribe(function (result) {
                    if (result.statusCode == 200) {
                        _this.toaster.success(result.responseMessage);
                        _this.refresh();
                    }
                    else {
                        _this.toaster.error(result.responseMessage);
                    }
                });
            }
        });
    };
    UsertypelistComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.usertypeserviceService.GetUserTypeList(this.listFilter, '', this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.usertypeserviceService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    UsertypelistComponent.ctorParameters = function () { return [
        { type: _usertypeservice_service__WEBPACK_IMPORTED_MODULE_5__["UsertypeserviceService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_1__["ToastrService"] }
    ]; };
    UsertypelistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-usertypelist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./usertypelist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/usertype/usertypelist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./usertypelist.component.scss */ "./src/app/views/usertype/usertypelist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_usertypeservice_service__WEBPACK_IMPORTED_MODULE_5__["UsertypeserviceService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_1__["ToastrService"]])
    ], UsertypelistComponent);
    return UsertypelistComponent;
}());



/***/ }),

/***/ "./src/app/views/usertype/usertypeservice.service.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/usertype/usertypeservice.service.ts ***!
  \***********************************************************/
/*! exports provided: UsertypeserviceService, UserType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsertypeserviceService", function() { return UsertypeserviceService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserType", function() { return UserType; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
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




var UsertypeserviceService = /** @class */ (function () {
    function UsertypeserviceService(http) {
        this.http = http;
        this.baseUri = "" + src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].WebApiBaseUrl;
        this.userUri = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].WebApiBaseUrl + "UserProfile";
    }
    UsertypeserviceService.prototype.addeditUserType = function (userTypeModel) {
        return this.http.post(this.baseUri + "UserProfile/AddUpdateUserType", userTypeModel);
    };
    UsertypeserviceService.prototype.GetUserTypeList = function (name, userType, sortColumn, sortDir, page, pageSize, userId) {
        var _this = this;
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.baseUri + "UserProfile/GetUserTypeList?name=" + name + "&userType=" + userType + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&userId=" + userId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    //function is used to delete the  user
    UsertypeserviceService.prototype.deleteUserType = function (id) {
        return this.http.get(this.baseUri + ("UserProfile/DeleteUserType?id=" + id));
    };
    //function is used to get detail of  user
    UsertypeserviceService.prototype.getUserTypeDetail = function (id) {
        return this.http.get(this.baseUri + ("UserProfile/GetUserTypeDetailById?Id=" + id));
    };
    UsertypeserviceService.prototype.GetModuleSubmoduleList = function (id) {
        return this.http.get(this.baseUri + ("UserProfile/GetModuleSubmoduleList?id=" + id));
    };
    UsertypeserviceService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
    ]; };
    UsertypeserviceService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], UsertypeserviceService);
    return UsertypeserviceService;
}());

var UserType = /** @class */ (function () {
    function UserType() {
        this.MasterValue = "";
        this.MasterStatusId = "";
        this.MasterDescription = "";
        this.MasterId = "";
        this.subModuleid = "";
    }
    return UserType;
}());



/***/ })

}]);
//# sourceMappingURL=views-usertype-usertype-module.js.map