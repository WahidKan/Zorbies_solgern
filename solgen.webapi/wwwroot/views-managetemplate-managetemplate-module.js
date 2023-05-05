(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-managetemplate-managetemplate-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/managetemplate/managetemplate.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/managetemplate/managetemplate.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Manage Proposal Template</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Proposal Template</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3\">\r\n        <div class=\"row mt-2\">\r\n\r\n          <div class=\"col-md-6\">\r\n            <div class=\"row searchfield  mr-1 w-100\">\r\n              <div class=\"col-md-4 float-left\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='searhName' placeholder=\"Search By Template Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-md-8 float-left\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"SearchLease()\"><span><i class=\"fa fa-search\"></i> Search</span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"ResetSearch()\"><span><i class=\"fa fa-refresh\"></i> Reset</span></a>\r\n                <a class=\"btn btn-white mr-1\" href=\"javascript:void(0);\" (click)=\"popUpOpen()\"><span><i class=\"fa fa-filter\"></i> Filter</span></a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-6\">\r\n            <div class=\"dt-buttons\">\r\n              <a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\"><span><i class=\"fa fa-list-alt\"></i> Manage View</span></a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rows]=\"pagedData.data\"\r\n                       [columnMode]=\"'force'\"\r\n                       [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       \r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"pagedData.pager.totalItems\"\r\n                       [offset]=\"pagedData.pager.currentPage\"\r\n                       [limit]=\"pagedData.pager.pageSize\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\">\r\n          <ngx-datatable-column name=\"Template Name\" prop=\"TemplateName\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n\r\n              <div *ngIf=\"!row.LeaseGenerated\">\r\n                <a [routerLink]=\"['edit',row.TemplateId]\">{{row.TemplateName}} </a>\r\n              </div>\r\n              <div *ngIf=\"row.LeaseGenerated\">\r\n                <a>{{row.TemplateName}} </a>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-column name=\"View\" [sortable]=\"false\"  [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div class=\"text-center\">\r\n                <a href=\"javascript:void(0);\" (click)=\"displayDetailDetail(row.TemplateContent)\"><i class=\"fa fa-eye text-info\" title=\"View\"></i></a>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Status\" prop=\"IsActive\" sortable=\"false\" headerClass=\"text-center\"\r\n                                *ngIf='modulePermission!==null && modulePermission.roleModuleUpdateFlag'  [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div *ngIf=\"!row.LeaseAssociated\">\r\n                <div class=\"text-center\" *ngIf=\"row.IsActive == 0\">\r\n                  <a href=\"javascript:void(0);\" (click)=\"enable(row)\"><i title=\"Click to enable.\" class=\"fa fa-times text-danger icon_tick\"></i></a>\r\n                </div>\r\n                <div class=\"text-center\" *ngIf=\"row.IsActive == 1\">\r\n                  <a href=\"javascript:void(0);\" (click)=\"disable(row)\"><i title=\"Click to disable.\" class=\"fa fa-check text-success icon_tick\"></i></a>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"row.LeaseAssociated\">\r\n\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"IsActive\" prop=\"IsActive\" sortable=\"false\" headerClass=\"text-center\"\r\n                                *ngIf='!modulePermission!==null && !modulePermission.roleModuleUpdateFlag'  [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div class=\"text-center\" *ngIf=\"row.IsActive == 0\">\r\n                <span><i class=\"fa fa-times text-danger icon_tick\"></i></span>\r\n              </div>\r\n              <div class=\"text-center\" *ngIf=\"row.IsActive == 1\">\r\n                <span><i class=\"fa fa-check text-success icon_tick\"></i></span>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Delete\" [sortable]=\"false\" headerClass=\"text-center\" *ngIf=\"modulePermission.roleModuleDeleteFlag\"  [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div class=\"text-center\" *ngIf=\"!row.LeaseAssociated\">\r\n                <a href=\"javascript:void(0);\" (click)=\"deleteLeaseTemplatebyId(row)\" class=\"btn-delete\"><i title=\"Click to delete.\" class=\"fa fa-trash\"></i></a>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"currentPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div class=\"page-count\" style=\"max-width:170px;\">\r\n                {{rowCount}} total\r\n              </div>\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                               [page]=\"pagedData.pager.currentPage+1\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"pagedData.pager.totalItems\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n<app-managetemplatedetail #temlateDetailModal></app-managetemplatedetail>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/managetemplate/managetemplateaddedit.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/managetemplate/managetemplateaddedit.component.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-9 mt-3\">\r\n          <span class=\"dash\">Manage Proposal Template</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/template\">Manage Proposal Template</a></li>\r\n            <li class=\"breadcrumb-item active\">{{pageTitle}}</li>\r\n          </ul>\r\n        </div>\r\n        <div class=\"col-md-3 mt-4 text-right\">\r\n          <button class=\"w-auto sw-100 btn btn-dark\" (click)=\"close()\"><i class=\"fa fa-arrow-left\"></i>&nbsp;Back</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <section class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 mt-4\">\r\n              <form [formGroup]=\"manageTemplateForm\" autocomplete=\"off\">\r\n                <div class=\"emailTemplate-box\" [ngClass]=\"{'disabled':loadSave}\">\r\n                  <div class=\"row\">\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Template Name:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Enter Template Name\" [attr.disabled]=\"isDisabled\"\r\n                               formControlName=\"templateName\"\r\n                               [ngClass]=\"{'is-invalid': (templateName.invalid && (templateName.dirty || templateName.touched) && (templateName.errors?.required || templateName.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"templateName.invalid && (templateName.dirty || templateName.touched) && templateName.errors?.required\"\r\n                               style=\"color:red;\">Template Name is required</small>\r\n                        <small *ngIf=\"templateName.invalid && (templateName.dirty || templateName.touched) && templateName.errors?.maxlength\"\r\n                               cstyle=\"color:red;\">Template Name must be less than 50 characters.</small>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Status:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <ng-select [items]=\"lstStatus\"\r\n                                   placeholder=\"Select Status\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"statusId\"\r\n                                   [ngClass]=\"{'is-invalid': (statusId.invalid && (statusId.dirty || statusId.touched) && statusId.errors?.required) }\">\r\n                        </ng-select>\r\n                        <small *ngIf=\"statusId.touched && statusId.errors?.required\" class=\"text-danger\">Please select Status</small>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-12 col-lg-12\">\r\n                      <label>Template:<span style=\"color:red\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <ckeditor #myckeditor name=\"myckeditor\"\r\n                                  formControlName=\"templateContent\"\r\n                                  required\r\n                                  [config]=\"ckeConfig\"\r\n                                  debounce=\"500\"\r\n                                  (paste)=\"onPaste($event)\"\r\n                                  (change)=\"onChange($event)\">\r\n                        </ckeditor>\r\n                        <small *ngIf=\"templateContent.invalid && (templateContent.dirty || templateContent.touched) && templateContent.errors?.required\"\r\n                               style=\"color:red;\">Template  is required</small>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n              </form>\r\n              <div class=\"col-12 p-0\">\r\n                <a href=\"javascript:void(0);\"  class=\"btn btn-primary form-btns\" (click)=\"save()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-danger form-btns\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/managetemplate/managetemplatedetail.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/managetemplate/managetemplatedetail.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #temlateDetailModal=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Proposal Template Detail</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow-y:auto; max-height:700px; margin-bottom:5px;\">\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12\">\r\n            <div [innerHTML]=\"htmlStr | safeHtml\"></div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/views/managetemplate/managetemplate-routing.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/views/managetemplate/managetemplate-routing.module.ts ***!
  \***********************************************************************/
/*! exports provided: ManagetemplateRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagetemplateRoutingModule", function() { return ManagetemplateRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _managetemplate_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./managetemplate.component */ "./src/app/views/managetemplate/managetemplate.component.ts");
/* harmony import */ var _managetemplateaddedit_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./managetemplateaddedit.component */ "./src/app/views/managetemplate/managetemplateaddedit.component.ts");
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
    { path: '', component: _managetemplate_component__WEBPACK_IMPORTED_MODULE_2__["ManagetemplateComponent"] },
    { path: 'edit/:id', component: _managetemplateaddedit_component__WEBPACK_IMPORTED_MODULE_3__["ManagetemplateaddeditComponent"], data: { title: 'Edit Lease Template' } }
];
var ManagetemplateRoutingModule = /** @class */ (function () {
    function ManagetemplateRoutingModule() {
    }
    ManagetemplateRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], ManagetemplateRoutingModule);
    return ManagetemplateRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/managetemplate/managetemplate.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/views/managetemplate/managetemplate.component.scss ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL21hbmFnZXRlbXBsYXRlL21hbmFnZXRlbXBsYXRlLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/managetemplate/managetemplate.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/views/managetemplate/managetemplate.component.ts ***!
  \******************************************************************/
/*! exports provided: ManagetemplateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagetemplateComponent", function() { return ManagetemplateComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _managetemplate_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./managetemplate.service */ "./src/app/views/managetemplate/managetemplate.service.ts");
/* harmony import */ var _managetemplatedetail_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./managetemplatedetail.component */ "./src/app/views/managetemplate/managetemplatedetail.component.ts");
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






var ManagetemplateComponent = /** @class */ (function () {
    function ManagetemplateComponent(leaseService, commonService, dialogService, toaster) {
        var _this = this;
        this.leaseService = leaseService;
        this.commonService = commonService;
        this.dialogService = dialogService;
        this.toaster = toaster;
        this.pagedData = {
            pager: {},
            data: []
        };
        this.loading = false;
        this.isCustomer = false;
        this.sortDir = 'desc';
        this.sortColumn = 'TemplateCreatedOn';
        this.docSortDir = 'desc';
        this.docSortColumn = 'DocumentCreatedOn';
        this.pageNumber = 0;
        this.loadSave = false;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
        this.modulePermission = this.commonService.getPermission(4311);
    }
    ManagetemplateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            if (userdetail.userType === 'usertype05') {
                _this.isCustomer = true;
            }
        });
        this.searhName = '';
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.SearchLease();
    };
    ManagetemplateComponent.prototype.getManageLeaseTemplateList = function () {
        var _this = this;
        this.leaseService.getManageLeaseTemplateList(this.searhName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(function (res) {
            _this.pagedData = _this.leaseService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ManagetemplateComponent.prototype.SearchLease = function () {
        var _this = this;
        this.loading = true;
        this.leaseService.getManageLeaseTemplateList(this.searhName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.leaseService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    ManagetemplateComponent.prototype.updateFilter = function (event) {
        this.searhName = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.SearchLease();
        }
    };
    ManagetemplateComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    ManagetemplateComponent.prototype.onChange = function ($eventSearchLease) {
        this.SearchLease();
    };
    ManagetemplateComponent.prototype.setPage = function ($event) {
        this.pageNumber = $event.page - 1;
        this.SearchLease();
    };
    ManagetemplateComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.pageNumber = $event.page - 1;
        this.SearchLease();
    };
    ManagetemplateComponent.prototype.ResetSearch = function () {
        this.searhName = '';
        this.sortDir = 'desc';
        this.sortColumn = 'LeaseCreatedOn';
        this.pageNumber = 0;
        this.SearchLease();
    };
    //function is used to disable the Lease Template
    ManagetemplateComponent.prototype.disable = function (row) {
        var _this = this;
        var message = "Are you sure you want to disable this Proposal Template \"" + row.TemplateName + "\"?";
        this.dialogService.confirm('Proposal Template', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.leaseService.changeStatus(row.TemplateId).subscribe(function (r) {
                    _this.refresh();
                    _this.toaster.success("\"" + row.TemplateName + "\" has been disabled   successfully ");
                }, function (error) {
                });
            }
        });
    };
    //function is used to enable the Lease Template
    ManagetemplateComponent.prototype.enable = function (row) {
        var _this = this;
        var message = "Are you sure you want to enable this Proposal Template \"" + row.TemplateName + "\"?";
        this.dialogService.confirm('Proposal Template', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.leaseService.changeStatus(row.TemplateId).subscribe(function (response) {
                    _this.refresh();
                    _this.toaster.success("\"" + row.TemplateName + "\" has been enabled  successfully");
                }, function (error) {
                });
            }
        });
    };
    ManagetemplateComponent.prototype.displayDetailDetail = function (TemplateName) {
        this.notificationDetailModal.show(TemplateName);
    };
    ManagetemplateComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.leaseService.getManageLeaseTemplateList(this.searhName, this.sortColumn, this.sortDir, this.pageNumber, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.leaseService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    //function is used to delete the Lease Template
    ManagetemplateComponent.prototype.deleteLeaseTemplatebyId = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Proposal Template\"" + row.TemplateName + "\"?";
        this.dialogService.confirm('Delete Proposal Template ', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.leaseService.deleteLeaseTemplatebyId(row.TemplateId).subscribe(function (response) {
                    if (response.statusCode == 200) {
                        _this.toaster.success("Proposal Template\"" + row.TemplateName + "\" has been deleted successfully");
                        _this.ResetSearch();
                    }
                    else {
                        _this.toaster.error(response.responseMessage);
                    }
                }, function (error) {
                });
            }
        });
    };
    ManagetemplateComponent.prototype.popUpOpen = function () {
    };
    ManagetemplateComponent.ctorParameters = function () { return [
        { type: _managetemplate_service__WEBPACK_IMPORTED_MODULE_4__["ManagetemplateService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__["ConfirmationDialogService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('temlateDetailModal', { static: false }),
        __metadata("design:type", _managetemplatedetail_component__WEBPACK_IMPORTED_MODULE_5__["ManagetemplatedetailComponent"])
    ], ManagetemplateComponent.prototype, "notificationDetailModal", void 0);
    ManagetemplateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-managetemplate',
            template: __importDefault(__webpack_require__(/*! raw-loader!./managetemplate.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/managetemplate/managetemplate.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./managetemplate.component.scss */ "./src/app/views/managetemplate/managetemplate.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_managetemplate_service__WEBPACK_IMPORTED_MODULE_4__["ManagetemplateService"], _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__["ConfirmationDialogService"], ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]])
    ], ManagetemplateComponent);
    return ManagetemplateComponent;
}());



/***/ }),

/***/ "./src/app/views/managetemplate/managetemplate.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/views/managetemplate/managetemplate.module.ts ***!
  \***************************************************************/
/*! exports provided: ManageTemplateModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageTemplateModule", function() { return ManageTemplateModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _managetemplate_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./managetemplate.component */ "./src/app/views/managetemplate/managetemplate.component.ts");
/* harmony import */ var _managetemplate_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./managetemplate-routing.module */ "./src/app/views/managetemplate/managetemplate-routing.module.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _managetemplateaddedit_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./managetemplateaddedit.component */ "./src/app/views/managetemplate/managetemplateaddedit.component.ts");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm5/ng2-ckeditor.js");
/* harmony import */ var _managetemplatedetail_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./managetemplatedetail.component */ "./src/app/views/managetemplate/managetemplatedetail.component.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};









var ManageTemplateModule = /** @class */ (function () {
    function ManageTemplateModule() {
    }
    ManageTemplateModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _managetemplate_component__WEBPACK_IMPORTED_MODULE_2__["ManagetemplateComponent"],
                _managetemplateaddedit_component__WEBPACK_IMPORTED_MODULE_5__["ManagetemplateaddeditComponent"],
                _managetemplatedetail_component__WEBPACK_IMPORTED_MODULE_7__["ManagetemplatedetailComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _managetemplate_routing_module__WEBPACK_IMPORTED_MODULE_3__["ManagetemplateRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                ng2_ckeditor__WEBPACK_IMPORTED_MODULE_6__["CKEditorModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__["ModalModule"]
            ]
        })
    ], ManageTemplateModule);
    return ManageTemplateModule;
}());



/***/ }),

/***/ "./src/app/views/managetemplate/managetemplate.service.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/managetemplate/managetemplate.service.ts ***!
  \****************************************************************/
/*! exports provided: ManagetemplateService, ManageTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagetemplateService", function() { return ManagetemplateService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManageTemplate", function() { return ManageTemplate; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
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






var ManagetemplateService = /** @class */ (function () {
    function ManagetemplateService(http, commonService) {
        this.http = http;
        this.commonService = commonService;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].WebApiBaseUrl;
    }
    //function used to fatch Lease Template List
    ManagetemplateService.prototype.getManageLeaseTemplateList = function (searchText, sortColumn, sortDir, pageIndex, pageSize, userId) {
        var _this = this;
        return this.http.get(this.baseUri + ("Lease/GetManageLeaseTemplateList?searchText=" + searchText + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&userId=" + userId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    ManagetemplateService.prototype.getManageTemplateById = function (id) {
        if (id === null) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_5__["of"])(this.InitializeManageTemplate());
        }
        return this.http.get(this.baseUri + "Lease/GetManageLeaseTemplateById?id=" + id);
    };
    ManagetemplateService.prototype.UpdateManageTemplate = function (manageTemplateModel) {
        return this.http.post(this.baseUri + "Lease/AddEditManageTemplate", manageTemplateModel);
    };
    ManagetemplateService.prototype.changeStatus = function (id) {
        return this.http.post(this.baseUri + ("Lease/ChangeStatus/" + id), null);
    };
    ManagetemplateService.prototype.deleteLeaseTemplatebyId = function (id) {
        return this.http.get(this.baseUri + "Lease/DeleteLeaseTemplatebyId?id=" + id);
    };
    ManagetemplateService.prototype.InitializeManageTemplate = function () {
        return {
            templateId: null,
            templateName: null,
            templateContent: null,
            templateCreatedOn: null,
            templateCreatedBy: null,
            templateModifiedOn: null,
            templateModifiedBy: null,
            templateIsDeleted: null,
            templateIsActive: null,
            statusId: null,
            enabled: false,
            userId: null,
            IsActive: false
        };
    };
    ManagetemplateService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] }
    ]; };
    ManagetemplateService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"]])
    ], ManagetemplateService);
    return ManagetemplateService;
}());

var ManageTemplate = /** @class */ (function () {
    function ManageTemplate() {
        this.templateId = '';
        this.templateName = '';
        this.templateContent = '';
        this.templateCreatedOn = '';
        this.templateCreatedBy = '';
        this.templateModifiedOn = '';
        this.templateModifiedBy = '';
        this.templateIsActive = '';
        this.enabled = true;
        this.statusId = null;
        this.IsActive = false;
        this.userId = '';
    }
    return ManageTemplate;
}());



/***/ }),

/***/ "./src/app/views/managetemplate/managetemplateaddedit.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/views/managetemplate/managetemplateaddedit.component.scss ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL21hbmFnZXRlbXBsYXRlL21hbmFnZXRlbXBsYXRlYWRkZWRpdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/managetemplate/managetemplateaddedit.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/views/managetemplate/managetemplateaddedit.component.ts ***!
  \*************************************************************************/
/*! exports provided: ManagetemplateaddeditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagetemplateaddeditComponent", function() { return ManagetemplateaddeditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _managetemplate_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./managetemplate.service */ "./src/app/views/managetemplate/managetemplate.service.ts");
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






var ManagetemplateaddeditComponent = /** @class */ (function () {
    function ManagetemplateaddeditComponent(fb, manageTemplateService, commonService, router, toaster, route) {
        var _this = this;
        this.fb = fb;
        this.manageTemplateService = manageTemplateService;
        this.commonService = commonService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.loadSave = false;
        this.manageTemplate = new _managetemplate_service__WEBPACK_IMPORTED_MODULE_5__["ManageTemplate"]();
        this.commonService.getMasterItemsList("status").subscribe(function (result) {
            _this.lstStatus = _this.commonService.masters;
        });
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
        this.mycontent = "<p>Enter content</p>";
    }
    ManagetemplateaddeditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addOrUpdatePermission = false;
        this.isDisabled = null;
        this.ckeConfig = {
            allowedContent: true,
            extraPlugins: 'divarea',
            forcePasteAsPlainText: true
        };
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
                _this.loadSave = true;
                _this.getEmailTemplate(id);
            }
            else {
                _this.pageTitle = 'Add Email Template';
                _this.addOrUpdatePermission = _this.modulePermission.roleModuleAddFlag;
            }
        });
        this.initForm();
    };
    ManagetemplateaddeditComponent.prototype.onChange = function ($event) {
    };
    ManagetemplateaddeditComponent.prototype.onPaste = function ($event) {
    };
    ManagetemplateaddeditComponent.prototype.save = function () {
        var _this = this;
        if (this.manageTemplateForm.valid) {
            this.loadSave = true;
            this.manageTemplate.templateId = this.manageTemplateForm.value.templateId;
            this.manageTemplate.statusId = this.manageTemplateForm.value.statusId;
            this.manageTemplate.templateName = this.manageTemplateForm.value.templateName;
            this.manageTemplate.templateContent = this.manageTemplateForm.value.templateContent;
            this.manageTemplateService.UpdateManageTemplate(this.manageTemplate).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.router.navigateByUrl("/template");
                    setTimeout(function () { _this.loadSave = false; }, 3000);
                }
                else {
                    _this.toaster.error(result.responseMessage);
                    _this.loadSave = false;
                }
            }, function (error) {
                _this.loadSave = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.manageTemplateForm);
        }
    };
    ManagetemplateaddeditComponent.prototype.getEmailTemplate = function (id) {
        var _this = this;
        this.manageTemplateService.getManageTemplateById(id)
            .subscribe(function (manageTemplate) {
            _this.displayEmailTemplate(manageTemplate);
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    ManagetemplateaddeditComponent.prototype.displayEmailTemplate = function (emailTemplate) {
        this.manageTemplate = emailTemplate;
        this.isDisabled = true;
        this.pageTitle = "Edit Proposal Template: " + this.manageTemplate.templateName;
        this.manageTemplateForm.patchValue({
            templateId: this.manageTemplate.templateId,
            templateName: this.manageTemplate.templateName,
            templateContent: this.manageTemplate.templateContent,
            statusId: this.manageTemplate.statusId,
        });
    };
    ManagetemplateaddeditComponent.prototype.close = function () {
        this.router.navigate(['/template']);
    };
    ManagetemplateaddeditComponent.prototype.initForm = function () {
        this.manageTemplateForm = this.fb.group({
            'templateId': ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            'templateName': ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(50)]],
            'templateContent': ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            'statusId': [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
        });
    };
    Object.defineProperty(ManagetemplateaddeditComponent.prototype, "templateId", {
        get: function () { return this.manageTemplateForm.get('templateId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManagetemplateaddeditComponent.prototype, "statusId", {
        get: function () { return this.manageTemplateForm.get('statusId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManagetemplateaddeditComponent.prototype, "templateName", {
        get: function () { return this.manageTemplateForm.get('templateName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ManagetemplateaddeditComponent.prototype, "templateContent", {
        get: function () { return this.manageTemplateForm.get('templateContent'); },
        enumerable: true,
        configurable: true
    });
    ManagetemplateaddeditComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _managetemplate_service__WEBPACK_IMPORTED_MODULE_5__["ManagetemplateService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("myckeditor", { static: false }),
        __metadata("design:type", Object)
    ], ManagetemplateaddeditComponent.prototype, "ckeditor", void 0);
    ManagetemplateaddeditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-managetemplateaddedit',
            template: __importDefault(__webpack_require__(/*! raw-loader!./managetemplateaddedit.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/managetemplate/managetemplateaddedit.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./managetemplateaddedit.component.scss */ "./src/app/views/managetemplate/managetemplateaddedit.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _managetemplate_service__WEBPACK_IMPORTED_MODULE_5__["ManagetemplateService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], ManagetemplateaddeditComponent);
    return ManagetemplateaddeditComponent;
}());



/***/ }),

/***/ "./src/app/views/managetemplate/managetemplatedetail.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/views/managetemplate/managetemplatedetail.component.scss ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL21hbmFnZXRlbXBsYXRlL21hbmFnZXRlbXBsYXRlZGV0YWlsLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/managetemplate/managetemplatedetail.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/views/managetemplate/managetemplatedetail.component.ts ***!
  \************************************************************************/
/*! exports provided: ManagetemplatedetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagetemplatedetailComponent", function() { return ManagetemplatedetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
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


var ManagetemplatedetailComponent = /** @class */ (function () {
    function ManagetemplatedetailComponent() {
        this.loadSave = false;
    }
    ManagetemplatedetailComponent.prototype.ngOnInit = function () {
    };
    ManagetemplatedetailComponent.prototype.show = function (templateContent) {
        this.temaplateContent = templateContent
            .replace(/@leaseNumber/g, "__________")
            .replace(/@solgenAddressValue/g, "__________")
            .replace(/@LesseeContact/g, "__________")
            .replace(/@vendorAddress/g, "__________")
            .replace(/@leaseDate/g, "__________")
            .replace(/@leaseDay/g, "__________")
            .replace(/@leaseMonth/g, "__________")
            .replace(/@leaseYear/g, "__________")
            .replace(/@leaseSerialNumber/g, "__________")
            .replace(/@leaseOtherDescription/g, "__________")
            .replace(/@lesseeName/g, "__________")
            .replace(/@lesseeAddress/g, "__________")
            .replace(/@leasePayment/g, "__________")
            .replace(/@leaseSales/g, "__________")
            .replace(/@licenseFee/g, "__________")
            .replace(/@lsttermstext/g, "__________")
            .replace(/@leaseResidualAmount/g, "__________")
            .replace(/@solgenPrintNameValue/g, "__________")
            .replace(/@lesseeCounty/g, "__________")
            .replace(/@leaseInsurance/g, "__________")
            .replace(/@lesseeCity/g, "__________")
            .replace(/@bankNamevalue/g, "__________")
            .replace(/@guarantorName/g, "__________")
            .replace(/@lesseestateValue/g, "__________")
            .replace(/@leaseAmountDueAtSigining/g, "__________")
            .replace(/@nextPaymentDueDate/g, "__________")
            .replace(/@leaseAdditions2/g, "__________")
            .replace(/@LeaseType/g, "__________")
            .replace(/@lesseeContactName/g, "__________")
            .replace(/@contactBankName/g, "__________")
            .replace(/@contactBankAddress/g, "__________")
            .replace(/@contactBankRoutingNumber/g, "__________")
            .replace(/@contactBankAccountNumber/g, "__________")
            .replace(/@leaseTerm1/g, "__________")
            .replace(/@leaseTerm2/g, "__________")
            .replace(/@documentationFee/g, "__________")
            .replace(/@debitAuthLeaseDateFrom/g, "__________")
            .replace(/@debitAuthMaturityDateBefore/g, "__________")
            .replace(/@leaseDescription/g, "__________")
            .replace(/@debitContactDetail/g, "__________");
        this.htmlStr = this.temaplateContent;
        this.modalBanklease.show();
    };
    ManagetemplatedetailComponent.prototype.close = function () {
        this.modalBanklease.hide();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('temlateDetailModal', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], ManagetemplatedetailComponent.prototype, "modalBanklease", void 0);
    ManagetemplatedetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-managetemplatedetail',
            template: __importDefault(__webpack_require__(/*! raw-loader!./managetemplatedetail.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/managetemplate/managetemplatedetail.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./managetemplatedetail.component.scss */ "./src/app/views/managetemplate/managetemplatedetail.component.scss")).default]
        }),
        __metadata("design:paramtypes", [])
    ], ManagetemplatedetailComponent);
    return ManagetemplatedetailComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-managetemplate-managetemplate-module.js.map