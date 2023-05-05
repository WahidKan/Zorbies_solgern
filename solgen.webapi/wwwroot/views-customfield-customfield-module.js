(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-customfield-customfield-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/customfield/addeditcustomfield.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/customfield/addeditcustomfield.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Add Custom Field</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/user\">Manage Custom Field</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"panel\">\r\n  <div class=\"panel-content\">\r\n    <form [formGroup]=\"customFiledGroup\" autocomplete=\"off\">\r\n      <div class=\"pannelleftboxesicons col-sm-12 col-md-12 col-lg-4 col-xl-3 float-left\">\r\n        <div class=\"collapse show p-3 add-custom\">\r\n          <div class=\"tablehead black-header light-grey \">\r\n            Select data type\r\n          </div>\r\n          <div class=\"bordered-content\">\r\n            <ul class=\"types columnlist list-group\">\r\n\r\n              <li class=\"list-group-item selected\" id=\"1\" code=\"string\" maxlength=\"100\" (click)=\"dataType('text')\">\r\n                <a href=\"javscript:;\">\r\n                  <i class=\"fa fa-text-height\"></i>\r\n                  <span>\r\n                    Text\r\n                  </span>\r\n                </a>\r\n              </li>\r\n              <li class=\"list-group-item\" id=\"2\" code=\"int\" maxlength=\"10\" (click)=\"dataType('Interger')\">\r\n                <a href=\"javscript:;\">\r\n                  <i class=\"fa fa-square-o\"></i>\r\n                  <span>\r\n                    Integer\r\n                  </span>\r\n                </a>\r\n              </li>\r\n              <li class=\"list-group-item\" id=\"3\" code=\"bigint\" maxlength=\"18\" (click)=\"dataType('LongInterger')\">\r\n                <a href=\"javscript:;\">\r\n                  <i class=\"fa fa-square-o\"></i>\r\n                  <span>\r\n                    Long Integer\r\n                  </span>\r\n                </a>\r\n              </li>\r\n              <li class=\"list-group-item\" id=\"4\" code=\"decimal\" maxlength=\"18\" (click)=\"dataType('Decimal')\">\r\n                <a href=\"javscript:;\">\r\n                  <i class=\"fa fa-dot-circle-o\"></i>\r\n                  <span>\r\n                    Decimal\r\n                  </span>\r\n                </a>\r\n              </li>\r\n              <li class=\"list-group-item\" id=\"5\" code=\"date\" maxlength=\"40\" (click)=\"dataType('Date')\">\r\n                <a href=\"javscript:;\">\r\n                  <i class=\"fa fa-calendar\"></i>\r\n                  <span>\r\n                    Date\r\n                  </span>\r\n                </a>\r\n              </li>\r\n              <li class=\"list-group-item\" id=\"6\" code=\"select\" maxlength=\"200\" (click)=\"dataType('SelectList')\">\r\n                <a href=\"javscript:;\">\r\n                  <i class=\"fa fa-list\"></i>\r\n                  <span>\r\n                    Select List\r\n                  </span>\r\n                </a>\r\n              </li>\r\n              <li class=\"list-group-item\" id=\"7\" code=\"Url\" maxlength=\"200\" (click)=\"dataType('Url')\">\r\n                <a href=\"javscript:;\">\r\n                  <i class=\"fa fa-globe\"></i>\r\n                  <span>\r\n                    URL\r\n                  </span>\r\n                </a>\r\n              </li>\r\n            </ul>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"col-sm-12 col-md-12 col-lg-8 col-xl-9 float-left\">\r\n\r\n        <div class=\"col-sm-12 col-md-12 col-lg-6 col-xl-6 float-left\">\r\n          <label for=\"SubModuleId\">Module Name:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <ng-select [items]=\"lstModuleList\" [loading]=\"loadSave\" [closeOnSelect]=\"true\" placeholder=\"Select Module Name\" formControlName=\"moduleName\" (change)=\"onChangeModuleName($event)\"\r\n                       bindLabel=\"text\" bindValue=\"value\"\r\n                       [ngClass]=\"{'is-invalid': (moduleName.invalid && (moduleName.dirty || moduleName.touched) && moduleName.errors?.required) }\"></ng-select>\r\n            <small *ngIf=\"moduleName.invalid && (moduleName.dirty || moduleName.touched) && moduleName.errors?.required\"\r\n                   style=\"color:red;\">Please select Module Name</small>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"col-sm-12 col-md-12 col-lg-6 col-xl-6 float-left\">\r\n\r\n          <label for=\"SubModuleId\">Sub Module Name:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <div class=\"form-group\">\r\n              <ng-select [items]=\"lstSubModuleList\" [loading]=\"loadSave\" [closeOnSelect]=\"true\" placeholder=\"Select status\" formControlName=\"subModuleName\"\r\n                         bindLabel=\"text\" bindValue=\"value\"\r\n                         [ngClass]=\"{'is-invalid': (subModuleName.invalid && (subModuleName.dirty || subModuleName.touched) && subModuleName.errors?.required) }\"></ng-select>\r\n              <small *ngIf=\"subModuleName.invalid && (subModuleName.dirty || subModuleName.touched) && subModuleName.errors?.required\"\r\n                     style=\"color:red;\">Please select Sub Module</small>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"col-sm-12 col-md-12 col-lg-6 col-xl-6 float-left\">\r\n\r\n          <label for=\"Name\">Field Name:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <input type=\"text\" class=\"form-control\" formControlName=\"fieldName\" maxlength=\"50\" placeholder=\"Enter Text\"\r\n                   [ngClass]=\"{'is-invalid': (fieldName.invalid && (fieldName.dirty || fieldName.touched) && (fieldName.errors?.required || fieldName.errors?.maxlength)) }\">\r\n            <small *ngIf=\"fieldName.invalid && (fieldName.dirty || fieldName.touched) && fieldName.errors?.required\"\r\n                   class=\"text-danger\">Field Name is required</small>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"col-sm-12 col-md-12 col-lg-6 col-xl-6 float-left\">\r\n          <label for=\"IsRequired\"></label>\r\n          <div class=\"form-group\">\r\n            <div class=\"custom-control custom-checkbox\">\r\n              <input class=\"custom-control-input\" id=\"isRequired\"  type=\"checkbox\" formControlName=\"isRequired\" />\r\n              <label class=\"custom-control-label\" for=\"isRequired\">\r\n                Is Required\r\n              </label>\r\n            </div>\r\n          </div>\r\n\r\n          <small class=\"form-text text-muted\">If anonymous, then minimum three user are required.</small>\r\n        </div>\r\n\r\n        <div *ngIf=\"isShownText\" class=\"col-sm-12 col-md-12 col-lg-6 col-xl-6 float-left\" id=\"divshow\">\r\n          <label for=\"description\">Length:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <input type=\"text\" class=\"form-control\" formControlName=\"custText\" maxlength=\"50\" placeholder=\"Enter Text\"\r\n                   [ngClass]=\"{'is-invalid': (custText.invalid && (custText.dirty || custText.touched) && (custText.errors?.required || custText.errors?.maxlength)) }\">\r\n            <small *ngIf=\"custText.invalid && (custText.dirty || custText.touched) && custText.errors?.required\"\r\n                   class=\"text-danger\">Length is required</small><br />\r\n            <label>Length range should be 1 to {{lengthofDisplay}}.</label>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"isShownInterger\" class=\"col-sm-12 col-md-12 col-lg-6 col-xl-6 float-left\" id=\"divshow\">\r\n          <label for=\"description\">Length:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <input type=\"text\" class=\"form-control\" formControlName=\"custInteger\" maxlength=\"50\" placeholder=\"Enter Integer\"\r\n                   [ngClass]=\"{'is-invalid': (custInteger.invalid && (custInteger.dirty || custInteger.touched) && (custInteger.errors?.required || custInteger.errors?.maxlength)) }\">\r\n            <small *ngIf=\"custInteger.invalid && (custInteger.dirty || custInteger.touched) && custInteger.errors?.required\"\r\n                   class=\"text-danger\">Length is required</small><br />\r\n            <label>Length range should be 1 to {{lengthofDisplay}}.</label>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"isShownLongInteger\" class=\"col-sm-12 col-md-12 col-lg-6 col-xl-6 float-left\" id=\"divshow\">\r\n          <label for=\"description\">Length:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <input type=\"text\" class=\"form-control\" formControlName=\"CustLogInterger\" maxlength=\"50\" placeholder=\"Enter long Integer\"\r\n                   [ngClass]=\"{'is-invalid': (CustLogInterger.invalid && (CustLogInterger.dirty || CustLogInterger.touched) && (CustLogInterger.errors?.required || CustLogInterger.errors?.maxlength)) }\">\r\n            <small *ngIf=\"CustLogInterger.invalid && (CustLogInterger.dirty || CustLogInterger.touched) && CustLogInterger.errors?.required\"\r\n                   class=\"text-danger\">Length is required</small><br />\r\n            <small>Length range should be 1 to {{lengthofDisplay}}.</small>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"isShownUrl\" class=\"col-sm-12 col-md-12 col-lg-6 col-xl-6 float-left\" id=\"divshow\">\r\n          <label for=\"description\">Length:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <input type=\"text\" class=\"form-control\" formControlName=\"custUrl\" placeholder=\"Enter Url\" maxlength=\"50\"\r\n                   [ngClass]=\"{'is-invalid': (custUrl.invalid && (custUrl.dirty || custUrl.touched) && (custUrl.errors?.required || custUrl.errors?.maxlength)) }\" />\r\n            <small *ngIf=\"custUrl.invalid && (custUrl.dirty || custUrl.touched) && custUrl.errors?.required\"\r\n                   class=\"text-danger\">Length is required</small><br />\r\n            <small>Length range should be 1 to {{lengthofDisplay}}.</small>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"isShownSelectList\" class=\"col-sm-12 col-md-12 col-lg-6 col-xl-6 float-left\" id=\"isShownSelectList\">\r\n          <label for=\"description\">Pick list Option:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <textarea class=\"form-control\" cols=\"20\" data-val=\"true\" placeholder=\"Enter Drop down value\" formControlName=\"custSelectList\" rows=\"2\" [ngClass]=\"{'is-invalid': (custSelectList.invalid && (custSelectList.dirty || custSelectList.touched) && (custSelectList.errors?.required || custSelectList.errors?.maxlength)) }\"></textarea>\r\n            <small *ngIf=\"custSelectList.invalid && (custSelectList.dirty || custSelectList.touched) && custSelectList.errors?.required\"\r\n                   class=\"text-danger\">Pick list Option is required</small><br />\r\n            <small>Use ^ to separate values eg: Public^Private.</small>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"divshowdecimal\" class=\"col-sm-12 col-md-12 col-lg-6 col-xl-6 float-left\" id=\"divshowdecimal\">\r\n          <label for=\"description\">Decimal Places:<span class=\"text-danger\"></span></label>\r\n          <div class=\"form-group\">\r\n            <input type=\"text\" class=\"form-control\" formControlName=\"custDecimalPlace\" maxlength=\"50\" placeholder=\"Enter Decimal value\">\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"divshowdecimalText\" class=\"col-sm-12 col-md-12 col-lg-6 col-xl-6 float-left\" id=\"divshow\">\r\n          <label for=\"description\">Length:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <textarea class=\"form-control\" cols=\"20\" data-val=\"true\" placeholder=\"Enter Decimal Length\" formControlName=\"custDecimalLength\" rows=\"2\"\r\n                      [ngClass]=\"{'is-invalid': (custDecimalLength.invalid && (custDecimalLength.dirty || custDecimalLength.touched) && (custDecimalLength.errors?.required || custDecimalLength.errors?.maxlength)) }\"></textarea>\r\n            <small *ngIf=\"custDecimalLength.invalid && (custDecimalLength.dirty || custDecimalLength.touched) && custDecimalLength.errors?.required\"\r\n                   class=\"text-danger\">Length is required</small>\r\n            <small>Use ^ to separate values eg: Public^Private.</small>\r\n          </div>\r\n        </div>\r\n        <div class=\"col-sm-12 col-md-12  float-left\">\r\n          <label for=\"description\">Description:<span class=\"text-danger\">*</span></label>\r\n          <div class=\"form-group\">\r\n            <textarea class=\"form-control\" cols=\"20\" id=\"txtdesc\" formControlName=\"description\" rows=\"2\"\r\n                      [ngClass]=\"{'is-invalid': (description.invalid && (description.dirty || description.touched) && (description.errors?.required || description.errors?.maxlength)) }\"></textarea>\r\n            <small *ngIf=\"description.invalid && (description.dirty || description.touched) && description.errors?.required\"\r\n                   class=\"text-danger\">Description is required</small>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"col-sm-12 col-md-12  float-left\">\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-success form-btns\" (click)=\"AddCustomField()\"><i class=\"fas fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger form-btns\" (click)=\"Cancel()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n        <div class=\"col-sm-12 col-md-12  float-left\"><span class=\"text-danger\">Fields marked with an asterisk (*) are mandatory.</span></div>\r\n      </div>\r\n    </form>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/customfield/customfieldlist.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/customfield/customfieldlist.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Manage Custom Field</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Custom Field</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<!-- Header Section-->\r\n<div class=\"dashboard-header section-padding\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"row d-flex align-items-md-stretch\">\r\n      <div class=\"col-12\">\r\n        <div class=\"bg-white border rounded pb-4\">\r\n          <div class=\"col-md-12 bg-light py-3\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-12 col-xl-12\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                    <div class=\"form-group mb-xl-0\">\r\n                      <ng-select #clearDrop [items]=\"lstModuleList\" placeholder=\"Select Module\" bindValue=\"value\" bindLabel=\"text\" [closeOnSelect]=\"true\" (change)=\"onChangeModuleName($event)\"\r\n                                 (clear)=\"restModuleNameddl()\">\r\n                      </ng-select>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-12 col-lg-12 col-xl-4\">\r\n                    <div class=\"form-group mb-xl-0\">\r\n                      <ng-select #clearDropSub [items]=\"lstSubModuleList\" placeholder=\"Select Sub Module\" bindValue=\"value\" bindLabel=\"text\" [closeOnSelect]=\"true\"\r\n                                 (change)=\"SetSubModule($event)\"\r\n                                 (clear)=\"restSubModuleddl()\">\r\n                      </ng-select>\r\n                    </div>\r\n                  </div>\r\n\r\n                  <div class=\"col-12 col-md-6 col-lg-6 col-xl-2 mr-auto\">\r\n                    <div class=\"form-group mb-xl-0\">\r\n                      <input type=\"button\" class=\"btn btn-primary src-icon\" (click)=\"search()\" value=\"Search\">\r\n                      <input type=\"button\" class=\"btn btn-danger reset-icon\" value=\"Reset\" (click)=\"reset()\" />\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-12 col-md-6 col-lg-6 col-xl-2 text-md-right float-right\"><a routerLink=\"/customfield/addcustomfield\" class=\"btn btn-orange form-btns \"><i class=\"fa fa-plus\"></i> Add Custom Field</a></div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 mt-4\">\r\n            <div class=\"table-responsive\">\r\n              <div class=\"table table-striped\">\r\n                <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                               [rows]=\"pagedData.data\"\r\n                               [columnMode]=\"'force'\"\r\n                               [headerHeight]=\"40\"\r\n                                  [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                               [footerHeight]=\"40\"\r\n                               \r\n                               [externalPaging]=\"true\"\r\n                               [externalSorting]=\"true\"\r\n                               [loadingIndicator]=\"loadSave\"\r\n                               [count]=\"pagedData.pager.totalItems\"\r\n                               [offset]=\"pagedData.pager.currentPage\"\r\n                               [limit]=\"pagedData.pager.pageSize\"\r\n                               (page)='setPage($event)'\r\n                               (sort)=\"onSort($event)\">\r\n                  <ngx-datatable-column name=\"Field Name\" [sortable]=\"true\" prop=\"name\">\r\n                    <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                      <div title=\"{{row.name}}\">\r\n                        <a [routerLink]=\"['/customfield/editcustomfield',row.Id]\">{{row.name| truncate}}</a>&nbsp;\r\n                      </div>\r\n                    </ng-template>\r\n                  </ngx-datatable-column>\r\n                  <ngx-datatable-column name=\"Module Name\" sortable=\"true\" prop=\"ModuleName\"></ngx-datatable-column>\r\n                  <ngx-datatable-column name=\"Sub Module Name\" sortable=\"true\" prop=\"subModuleName\"></ngx-datatable-column>\r\n                  <ngx-datatable-column name=\"Type\" sortable=\"true\" prop=\"Type\">\r\n                  </ngx-datatable-column>\r\n                  <ngx-datatable-column name=\"Length\" sortable=\"true\" prop=\"length\">\r\n                  </ngx-datatable-column>\r\n                  <!--<ngx-datatable-column name=\"IsActive\" [sortable]=\"true\" headerClass=\"text-center\">\r\n                    <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                      <div class=\"icon-text-center\">\r\n                        <div *ngIf=\"row.MasterKey!=='common-001' && row.MasterKey!='common-002'\">\r\n                          <a *ngIf=\"row.IsActive == 0\" href=\"javascript:void(0);\" (click)=\"enable(row)\" class=\"text-danger mx-1\"><i title=\"Click to enable.\" class=\"fa fa-times\"></i></a>\r\n                          <a *ngIf=\"row.IsActive == 1\" href=\"javascript:void(0);\" (click)=\"disable(row)\" class=\"text-success mx-1\"><i title=\"Click to disable.\" class=\"fas fa-check\"></i></a>\r\n                        </div>\r\n                      </div>\r\n                    </ng-template>\r\n                  </ngx-datatable-column>\r\n\r\n                  <ngx-datatable-column name=\"Delete\" [sortable]=\"false\" headerClass=\"text-center\">\r\n                    <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                      <div class=\"icon-text-center\" *ngIf=\"row.MasterKey!=='common-001' && row.MasterKey!='common-002'\">\r\n                        <a href=\"javascript:void(0);\" (click)=\"DeleteMasters(row)\" class=\"text-danger mx-1\"><i title=\"Click to delete.\" class=\"fa fa-trash\"></i></a>\r\n                      </div>\r\n                    </ng-template>\r\n                  </ngx-datatable-column>-->\r\n\r\n                  <ngx-datatable-footer>\r\n                    <ng-template ngx-datatable-footer-template\r\n                                 let-rowCount=\"rowCount\"\r\n                                 let-pageSize=\"pageSize\"\r\n                                 let-selectedCount=\"selectedCount\"\r\n                                 let-currentPage=\"currentPage\"\r\n                                 let-offset=\"offset\"\r\n                                 let-isVisible=\"isVisible\">\r\n                      <div class=\"page-count\" style=\"max-width:170px;\">\r\n                        {{rowCount}} total\r\n                      </div>\r\n                      <div>\r\n                        <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                          <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                            <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                       bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                          </span>\r\n                        </div>\r\n                      </div>\r\n                      <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                       [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                       [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                       [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                       [page]=\"pagedData.pager.currentPage+1\"\r\n                                       [size]=\"pageSizeValue\"\r\n                                       [count]=\"pagedData.pager.totalItems\"\r\n                                       [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                       (change)=\"setPage($event)\">\r\n                      </datatable-pager>\r\n                    </ng-template>\r\n                  </ngx-datatable-footer>\r\n                </ngx-datatable>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./src/app/views/customfield/addeditcustomfield.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/views/customfield/addeditcustomfield.component.ts ***!
  \*******************************************************************/
/*! exports provided: AddeditcustomfieldComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditcustomfieldComponent", function() { return AddeditcustomfieldComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _master_master_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../master/master.service */ "./src/app/views/master/master.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _managelease_managelease_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../managelease/managelease.service */ "./src/app/views/managelease/managelease.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _customfield_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./customfield.service */ "./src/app/views/customfield/customfield.service.ts");
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










var AddeditcustomfieldComponent = /** @class */ (function () {
    function AddeditcustomfieldComponent(fb, masterService, modalService, customfieldService, leaseService, commonService, router, toaster, route, dialogService) {
        this.fb = fb;
        this.masterService = masterService;
        this.modalService = modalService;
        this.customfieldService = customfieldService;
        this.leaseService = leaseService;
        this.commonService = commonService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.dialogService = dialogService;
        this.customFieldModel = new _customfield_service__WEBPACK_IMPORTED_MODULE_9__["CustomFieldModel"]();
        this.isShown = false;
        this.divshowdecimal = false;
        this.isShownText = false;
        this.isShownInterger = false;
        this.isShownLongInteger = false;
        this.isShownUrl = false;
        this.isShownSelectList = false;
        this.divshowdecimalText = false;
        this.loadSave = false;
    }
    AddeditcustomfieldComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initForm();
        this.LoadCustomFieldsLength();
        this.isShownLongInteger = false;
        this.isShownInterger = false;
        this.isShownText = false;
        this.isShownUrl = false;
        this.isShownSelectList = false;
        this.divshowdecimal = false;
        this.divshowdecimalText = false;
        this.pageTitle = 'Add Custom Field';
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            if (id) {
                _this.loadSave = true;
                _this.fillForm(id);
            }
            else {
                _this.pageTitle = 'Add Custom Field';
                //this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
            }
        });
    };
    AddeditcustomfieldComponent.prototype.LoadCustomFieldsLength = function () {
        var _this = this;
        this.commonService.getMasterItemsList("custom_modules").subscribe(function (res) {
            _this.lstModuleList = _this.commonService.masters;
        });
    };
    AddeditcustomfieldComponent.prototype.AddCustomField = function () {
        var _this = this;
        if (this.customFiledGroup.valid) {
            this.customFieldModel.moduleName = this.customFiledGroup.value.moduleName;
            this.customFieldModel.subModuleName = this.customFiledGroup.value.subModuleName;
            this.customFieldModel.fieldName = this.customFiledGroup.value.fieldName;
            this.customFieldModel.custInteger = this.customFiledGroup.value.custInteger;
            this.customFieldModel.custText = this.customFiledGroup.value.custText;
            this.customFieldModel.custDecimalLength = this.customFiledGroup.value.custDecimalLength;
            this.customFieldModel.CustLogInterger = this.customFiledGroup.value.CustLogInterger;
            this.customFieldModel.description = this.customFiledGroup.value.description;
            this.customFieldModel.custUrl = this.customFiledGroup.value.custUrl;
            this.customFieldModel.custSelectList = this.customFiledGroup.value.custSelectList;
            this.customFieldModel.id = this.customFiledGroup.value.id;
            this.customFieldModel.isRequired = this.customFiledGroup.value.isRequired;
            this.customFieldModel.dataTypeCode = this.dataTypeCode;
            this.customFieldModel.decimalPlaceValue = this.customFiledGroup.value.custDecimalPlace;
            this.customfieldService.AddEditCustomField(this.customFieldModel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.router.navigateByUrl("/customfield");
                    setTimeout(function () { _this.loadSave = false; }, 3000);
                }
                else {
                    _this.toaster.error(result.responseMessage);
                }
            }, function (error) {
                _this.loadSave = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.customFiledGroup);
            this.loadSave = false;
        }
    };
    AddeditcustomfieldComponent.prototype.fillForm = function (id) {
        var _this = this;
        //this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
        this.customfieldService.GetCustomFieldDetail(id).subscribe(function (result) {
            if (result) {
                _this.loadSave = false;
                _this.pageTitle = 'Edit Custom Field';
                _this.customFiledGroup.patchValue({
                    id: result.id,
                    moduleName: result.moduleName,
                    subModuleName: result.subModuleName,
                    fieldName: result.fieldName,
                    custText: result.custText,
                    custInteger: result.custInteger,
                    custDecimalLength: result.custDecimalLength,
                    CustLogInterger: result.CustLogInterger,
                    description: result.description,
                    custUrl: result.custUrl,
                    custSelectList: result.custSelectList,
                    isRequired: result.isRequired
                });
                if (result.moduleName != null) {
                    _this.commonService.getMasterSubModuleList("custom_sub_modules", result.moduleName).subscribe(function (res) {
                        _this.lstSubModuleList = _this.commonService.masters;
                    });
                }
                if (result.dataTypeCode == 'Text') {
                    _this.lengthofDisplay = 100;
                    _this.isShownText = true;
                    _this.divshowdecimal = false;
                    _this.isShownInterger = false;
                    _this.isShownLongInteger = false;
                    _this.isShownUrl = false;
                    _this.isShownSelectList = false;
                    _this.custText.setValue(result.length);
                    _this.divshowdecimalText = false;
                    _this.dataTypeCode = 'string';
                    _this.customFiledGroup.controls["custText"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
                    _this.customFiledGroup.controls["custText"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custInteger"].clearValidators();
                    _this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custDecimalLength"].clearValidators();
                    _this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
                    _this.customFiledGroup.controls["description"].clearValidators();
                    _this.customFiledGroup.controls["description"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custUrl"].clearValidators();
                    _this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custSelectList"].clearValidators();
                    _this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
                    _this.customFiledGroup.controls["CustLogInterger"].clearValidators();
                    _this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
                }
                else if (result.dataTypeCode == 'Integer') {
                    _this.lengthofDisplay = 10;
                    _this.isShownInterger = true;
                    _this.isShownText = false;
                    _this.divshowdecimal = false;
                    _this.divshowdecimalText = false;
                    _this.isShownLongInteger = false;
                    _this.isShownUrl = false;
                    _this.isShownSelectList = false;
                    _this.dataTypeCode = 'int';
                    _this.divshowdecimalText = false;
                    _this.custInteger.setValue(result.length);
                    _this.customFiledGroup.controls["custInteger"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
                    _this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custText"].clearValidators();
                    _this.customFiledGroup.controls["custText"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custDecimalLength"].clearValidators();
                    _this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
                    _this.customFiledGroup.controls["description"].clearValidators();
                    _this.customFiledGroup.controls["description"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custUrl"].clearValidators();
                    _this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custSelectList"].clearValidators();
                    _this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
                    _this.customFiledGroup.controls["CustLogInterger"].clearValidators();
                    _this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
                }
                else if (result.dataTypeCode == 'Long Integer') {
                    _this.lengthofDisplay = 18;
                    _this.isShownLongInteger = true;
                    _this.isShownInterger = false;
                    _this.isShownText = false;
                    _this.divshowdecimal = false;
                    _this.isShownUrl = false;
                    _this.isShownSelectList = false;
                    _this.dataTypeCode = 'bigint';
                    _this.divshowdecimalText = false;
                    _this.CustLogInterger.setValue(result.length);
                    _this.customFiledGroup.controls["CustLogInterger"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
                    _this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custInteger"].clearValidators();
                    _this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custText"].clearValidators();
                    _this.customFiledGroup.controls["custText"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custDecimalLength"].clearValidators();
                    _this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
                    _this.customFiledGroup.controls["description"].clearValidators();
                    _this.customFiledGroup.controls["description"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custUrl"].clearValidators();
                    _this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custSelectList"].clearValidators();
                    _this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
                }
                else if (result.dataTypeCode == 'Decimal') {
                    _this.lengthofDisplay = 18;
                    _this.isShownLongInteger = false;
                    _this.isShownInterger = false;
                    _this.isShownText = false;
                    _this.isShownUrl = false;
                    _this.isShownSelectList = false;
                    _this.dataTypeCode = 'decimal';
                    _this.divshowdecimal = true;
                    _this.divshowdecimalText = true;
                    _this.custDecimalLength.setValue(result.length);
                    _this.custDecimalPlace.setValue(result.decimalPlaceValue);
                    _this.customFiledGroup.controls["custDecimalLength"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
                    _this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
                    _this.customFiledGroup.controls["CustLogInterger"].clearValidators();
                    _this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custInteger"].clearValidators();
                    _this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custText"].clearValidators();
                    _this.customFiledGroup.controls["custText"].updateValueAndValidity();
                    _this.customFiledGroup.controls["description"].clearValidators();
                    _this.customFiledGroup.controls["description"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custUrl"].clearValidators();
                    _this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custSelectList"].clearValidators();
                    _this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
                }
                else if (result.dataTypeCode == 'Select List') {
                    _this.isShownLongInteger = false;
                    _this.isShownInterger = false;
                    _this.isShownText = false;
                    _this.isShownUrl = false;
                    _this.isShownSelectList = true;
                    _this.divshowdecimal = false;
                    _this.divshowdecimalText = false;
                    _this.dataTypeCode = 'select';
                    _this.custSelectList.setValue(result.selectDrpList);
                    _this.customFiledGroup.controls["custSelectList"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
                    _this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
                    _this.customFiledGroup.controls["CustLogInterger"].clearValidators();
                    _this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custInteger"].clearValidators();
                    _this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custText"].clearValidators();
                    _this.customFiledGroup.controls["custText"].updateValueAndValidity();
                    _this.customFiledGroup.controls["description"].clearValidators();
                    _this.customFiledGroup.controls["description"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custUrl"].clearValidators();
                    _this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custDecimalLength"].clearValidators();
                    _this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
                }
                else if (result.dataTypeCode == 'Url') {
                    _this.lengthofDisplay = 200;
                    _this.isShownLongInteger = false;
                    _this.isShownInterger = false;
                    _this.isShownText = false;
                    _this.isShownUrl = true;
                    _this.isShownSelectList = false;
                    _this.dataTypeCode = 'Url';
                    _this.divshowdecimal = false;
                    _this.divshowdecimalText = false;
                    _this.custUrl.setValue(result.length);
                    _this.customFiledGroup.controls["custUrl"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
                    _this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
                    _this.customFiledGroup.controls["CustLogInterger"].clearValidators();
                    _this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custInteger"].clearValidators();
                    _this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custText"].clearValidators();
                    _this.customFiledGroup.controls["custText"].updateValueAndValidity();
                    _this.customFiledGroup.controls["description"].clearValidators();
                    _this.customFiledGroup.controls["description"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custSelectList"].clearValidators();
                    _this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
                    _this.customFiledGroup.controls["custDecimalLength"].clearValidators();
                    _this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
                }
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AddeditcustomfieldComponent.prototype.dataType = function ($event) {
        if ($event == 'text') {
            this.lengthofDisplay = 100;
            this.isShownText = true;
            this.divshowdecimal = false;
            this.isShownInterger = false;
            this.isShownLongInteger = false;
            this.isShownUrl = false;
            this.isShownSelectList = false;
            this.divshowdecimalText = false;
            this.dataTypeCode = 'string';
            this.custInteger.setValue('');
            this.CustLogInterger.setValue('');
            this.custSelectList.setValue('');
            this.custDecimalLength.setValue('');
            this.customFiledGroup.controls["custText"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.customFiledGroup.controls["custText"].updateValueAndValidity();
            this.customFiledGroup.controls["custInteger"].clearValidators();
            this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
            this.customFiledGroup.controls["custDecimalLength"].clearValidators();
            this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
            this.customFiledGroup.controls["description"].clearValidators();
            this.customFiledGroup.controls["description"].updateValueAndValidity();
            this.customFiledGroup.controls["custUrl"].clearValidators();
            this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
            this.customFiledGroup.controls["custSelectList"].clearValidators();
            this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
            this.customFiledGroup.controls["CustLogInterger"].clearValidators();
            this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
        }
        else if ($event == 'Interger') {
            this.lengthofDisplay = 10;
            this.isShownInterger = true;
            this.isShownText = false;
            this.divshowdecimal = false;
            this.divshowdecimalText = false;
            this.isShownLongInteger = false;
            this.isShownUrl = false;
            this.isShownSelectList = false;
            this.dataTypeCode = 'int';
            this.divshowdecimalText = false;
            this.custText.setValue('');
            this.CustLogInterger.setValue('');
            this.custSelectList.setValue('');
            this.custUrl.setValue('');
            this.custDecimalLength.setValue('');
            this.customFiledGroup.controls["custInteger"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
            this.customFiledGroup.controls["custText"].clearValidators();
            this.customFiledGroup.controls["custText"].updateValueAndValidity();
            this.customFiledGroup.controls["custDecimalLength"].clearValidators();
            this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
            this.customFiledGroup.controls["description"].clearValidators();
            this.customFiledGroup.controls["description"].updateValueAndValidity();
            this.customFiledGroup.controls["custUrl"].clearValidators();
            this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
            this.customFiledGroup.controls["custSelectList"].clearValidators();
            this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
            this.customFiledGroup.controls["CustLogInterger"].clearValidators();
            this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
        }
        else if ($event == 'LongInterger') {
            this.lengthofDisplay = 18;
            this.isShownLongInteger = true;
            this.isShownInterger = false;
            this.isShownText = false;
            this.divshowdecimal = false;
            this.isShownUrl = false;
            this.isShownSelectList = false;
            this.dataTypeCode = 'bigint';
            this.divshowdecimalText = false;
            this.custInteger.setValue('');
            this.custText.setValue('');
            this.custSelectList.setValue('');
            this.custUrl.setValue('');
            this.custDecimalLength.setValue('');
            this.customFiledGroup.controls["CustLogInterger"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
            this.customFiledGroup.controls["custInteger"].clearValidators();
            this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
            this.customFiledGroup.controls["custText"].clearValidators();
            this.customFiledGroup.controls["custText"].updateValueAndValidity();
            this.customFiledGroup.controls["custDecimalLength"].clearValidators();
            this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
            this.customFiledGroup.controls["description"].clearValidators();
            this.customFiledGroup.controls["description"].updateValueAndValidity();
            this.customFiledGroup.controls["custUrl"].clearValidators();
            this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
            this.customFiledGroup.controls["custSelectList"].clearValidators();
            this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
        }
        else if ($event == 'Decimal') {
            this.lengthofDisplay = 18;
            this.isShownLongInteger = false;
            this.isShownInterger = false;
            this.isShownText = false;
            this.isShownUrl = false;
            this.isShownSelectList = false;
            this.dataTypeCode = 'decimal';
            this.divshowdecimal = true;
            this.divshowdecimalText = true;
            this.custInteger.setValue('');
            this.custText.setValue('');
            this.CustLogInterger.setValue('');
            this.custSelectList.setValue('');
            this.custUrl.setValue('');
            this.customFiledGroup.controls["custDecimalLength"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
            this.customFiledGroup.controls["CustLogInterger"].clearValidators();
            this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
            this.customFiledGroup.controls["custInteger"].clearValidators();
            this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
            this.customFiledGroup.controls["custText"].clearValidators();
            this.customFiledGroup.controls["custText"].updateValueAndValidity();
            this.customFiledGroup.controls["description"].clearValidators();
            this.customFiledGroup.controls["description"].updateValueAndValidity();
            this.customFiledGroup.controls["custUrl"].clearValidators();
            this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
            this.customFiledGroup.controls["custSelectList"].clearValidators();
            this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
        }
        else if ($event == 'SelectList') {
            this.isShownLongInteger = false;
            this.isShownInterger = false;
            this.isShownText = false;
            this.isShownUrl = false;
            this.isShownSelectList = true;
            this.divshowdecimal = false;
            this.divshowdecimalText = false;
            this.dataTypeCode = 'select';
            this.custInteger.setValue('');
            this.custText.setValue('');
            this.CustLogInterger.setValue('');
            this.custDecimalLength.setValue('');
            this.custUrl.setValue('');
            this.customFiledGroup.controls["custSelectList"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
            this.customFiledGroup.controls["CustLogInterger"].clearValidators();
            this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
            this.customFiledGroup.controls["custInteger"].clearValidators();
            this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
            this.customFiledGroup.controls["custText"].clearValidators();
            this.customFiledGroup.controls["custText"].updateValueAndValidity();
            this.customFiledGroup.controls["description"].clearValidators();
            this.customFiledGroup.controls["description"].updateValueAndValidity();
            this.customFiledGroup.controls["custUrl"].clearValidators();
            this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
            this.customFiledGroup.controls["custDecimalLength"].clearValidators();
            this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
        }
        else if ($event == 'Url') {
            this.lengthofDisplay = 200;
            this.isShownLongInteger = false;
            this.isShownInterger = false;
            this.isShownText = false;
            this.isShownUrl = true;
            this.isShownSelectList = false;
            this.dataTypeCode = 'Url';
            this.divshowdecimal = false;
            this.divshowdecimalText = false;
            this.custInteger.setValue('');
            this.custText.setValue('');
            this.CustLogInterger.setValue('');
            this.custDecimalLength.setValue('');
            this.custSelectList.setValue('');
            this.custDecimalLength.setValue('');
            this.customFiledGroup.controls["custUrl"].setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required);
            this.customFiledGroup.controls["custUrl"].updateValueAndValidity();
            this.customFiledGroup.controls["CustLogInterger"].clearValidators();
            this.customFiledGroup.controls["CustLogInterger"].updateValueAndValidity();
            this.customFiledGroup.controls["custInteger"].clearValidators();
            this.customFiledGroup.controls["custInteger"].updateValueAndValidity();
            this.customFiledGroup.controls["custText"].clearValidators();
            this.customFiledGroup.controls["custText"].updateValueAndValidity();
            this.customFiledGroup.controls["description"].clearValidators();
            this.customFiledGroup.controls["description"].updateValueAndValidity();
            this.customFiledGroup.controls["custSelectList"].clearValidators();
            this.customFiledGroup.controls["custSelectList"].updateValueAndValidity();
            this.customFiledGroup.controls["custDecimalLength"].clearValidators();
            this.customFiledGroup.controls["custDecimalLength"].updateValueAndValidity();
        }
        else if ($event == 'Date') {
            this.isShownLongInteger = false;
            this.isShownInterger = false;
            this.isShownText = false;
            this.isShownUrl = false;
            this.isShownSelectList = false;
            this.divshowdecimal = false;
            this.divshowdecimalText = false;
            this.dataTypeCode = 'date';
        }
        else {
            this.isShownLongInteger = false;
            this.isShownInterger = false;
            this.isShownText = false;
            this.isShownUrl = false;
            this.isShownSelectList = false;
            this.divshowdecimal = false;
            this.divshowdecimalText = false;
        }
    };
    AddeditcustomfieldComponent.prototype.Cancel = function () {
        this.router.navigateByUrl("/customfield");
    };
    AddeditcustomfieldComponent.prototype.onChangeModuleName = function ($event) {
        var _this = this;
        this.commonService.getMasterSubModuleList("custom_sub_modules", $event.value).subscribe(function (res) {
            _this.lstSubModuleList = _this.commonService.masters;
            // console.log("sdddd", this.lstSubModuleList);
        });
    };
    AddeditcustomfieldComponent.prototype.initForm = function () {
        this.customFiledGroup = this.fb.group({
            moduleName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            subModuleName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            fieldName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            custText: [''],
            custInteger: [''],
            custDecimalLength: [''],
            CustLogInterger: [''],
            description: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            custUrl: [''],
            custSelectList: [''],
            id: [''],
            custDecimalPlace: [''],
            isRequired: [null]
        });
    };
    Object.defineProperty(AddeditcustomfieldComponent.prototype, "moduleName", {
        get: function () { return this.customFiledGroup.get('moduleName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcustomfieldComponent.prototype, "subModuleName", {
        get: function () { return this.customFiledGroup.get('subModuleName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcustomfieldComponent.prototype, "fieldName", {
        get: function () { return this.customFiledGroup.get('fieldName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcustomfieldComponent.prototype, "length", {
        get: function () { return this.customFiledGroup.get('length'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcustomfieldComponent.prototype, "isRequired", {
        get: function () { return this.customFiledGroup.get('isRequired'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcustomfieldComponent.prototype, "description", {
        get: function () { return this.customFiledGroup.get('description'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcustomfieldComponent.prototype, "id", {
        get: function () { return this.customFiledGroup.get('id'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcustomfieldComponent.prototype, "custText", {
        get: function () { return this.customFiledGroup.get('custText'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcustomfieldComponent.prototype, "custInteger", {
        get: function () { return this.customFiledGroup.get('custInteger'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcustomfieldComponent.prototype, "CustLogInterger", {
        get: function () { return this.customFiledGroup.get('CustLogInterger'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcustomfieldComponent.prototype, "custUrl", {
        get: function () { return this.customFiledGroup.get('custUrl'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcustomfieldComponent.prototype, "custSelectList", {
        get: function () { return this.customFiledGroup.get('custSelectList'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcustomfieldComponent.prototype, "custDecimalLength", {
        get: function () { return this.customFiledGroup.get('custDecimalLength'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditcustomfieldComponent.prototype, "custDecimalPlace", {
        get: function () { return this.customFiledGroup.get('custDecimalPlace'); },
        enumerable: true,
        configurable: true
    });
    AddeditcustomfieldComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _master_master_service__WEBPACK_IMPORTED_MODULE_2__["MasterService"] },
        { type: ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__["BsModalService"] },
        { type: _customfield_service__WEBPACK_IMPORTED_MODULE_9__["CustomfieldService"] },
        { type: _managelease_managelease_service__WEBPACK_IMPORTED_MODULE_4__["ManageleaseService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_8__["ConfirmationDialogService"] }
    ]; };
    AddeditcustomfieldComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditcustomfield',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditcustomfield.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/customfield/addeditcustomfield.component.html")).default
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _master_master_service__WEBPACK_IMPORTED_MODULE_2__["MasterService"],
            ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__["BsModalService"], _customfield_service__WEBPACK_IMPORTED_MODULE_9__["CustomfieldService"],
            _managelease_managelease_service__WEBPACK_IMPORTED_MODULE_4__["ManageleaseService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_7__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_8__["ConfirmationDialogService"]])
    ], AddeditcustomfieldComponent);
    return AddeditcustomfieldComponent;
}());



/***/ }),

/***/ "./src/app/views/customfield/customfield-routing.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/views/customfield/customfield-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: CustomFieldRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomFieldRoutingModule", function() { return CustomFieldRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _addeditcustomfield_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addeditcustomfield.component */ "./src/app/views/customfield/addeditcustomfield.component.ts");
/* harmony import */ var _customfieldlist_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./customfieldlist.component */ "./src/app/views/customfield/customfieldlist.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};




//import { ListbankComponent } from './listbank.component';
//import { AddeditbankComponent } from './addeditbank.component';
var routes = [
    { path: '', component: _customfieldlist_component__WEBPACK_IMPORTED_MODULE_3__["CustomfieldlistComponent"] },
    { path: 'addcustomfield', component: _addeditcustomfield_component__WEBPACK_IMPORTED_MODULE_2__["AddeditcustomfieldComponent"] },
    { path: 'editcustomfield/:id', component: _addeditcustomfield_component__WEBPACK_IMPORTED_MODULE_2__["AddeditcustomfieldComponent"] }
];
var CustomFieldRoutingModule = /** @class */ (function () {
    function CustomFieldRoutingModule() {
    }
    CustomFieldRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], CustomFieldRoutingModule);
    return CustomFieldRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/customfield/customfield.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/views/customfield/customfield.module.ts ***!
  \*********************************************************/
/*! exports provided: CustomFieldModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomFieldModule", function() { return CustomFieldModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _customfield_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./customfield-routing.module */ "./src/app/views/customfield/customfield-routing.module.ts");
/* harmony import */ var _addeditcustomfield_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./addeditcustomfield.component */ "./src/app/views/customfield/addeditcustomfield.component.ts");
/* harmony import */ var _customfieldlist_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./customfieldlist.component */ "./src/app/views/customfield/customfieldlist.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};











var CustomFieldModule = /** @class */ (function () {
    function CustomFieldModule() {
    }
    CustomFieldModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_addeditcustomfield_component__WEBPACK_IMPORTED_MODULE_8__["AddeditcustomfieldComponent"], _customfieldlist_component__WEBPACK_IMPORTED_MODULE_9__["CustomfieldlistComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _customfield_routing_module__WEBPACK_IMPORTED_MODULE_7__["CustomFieldRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["NgxDatatableModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__["ModalModule"]
            ]
        })
    ], CustomFieldModule);
    return CustomFieldModule;
}());



/***/ }),

/***/ "./src/app/views/customfield/customfield.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/customfield/customfield.service.ts ***!
  \**********************************************************/
/*! exports provided: CustomfieldService, CustomFieldModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomfieldService", function() { return CustomfieldService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomFieldModel", function() { return CustomFieldModel; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
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





var CustomfieldService = /** @class */ (function () {
    function CustomfieldService(http, commonService) {
        this.http = http;
        this.commonService = commonService;
        this.baseUri = "" + src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
    }
    CustomfieldService.prototype.AddEditCustomField = function (customFieldModel) {
        // console.log("customFieldModel", customFieldModel);
        return this.http.post(this.baseUri + "Bank/AddEditCustomField", customFieldModel);
    };
    CustomfieldService.prototype.GetCustomFieldDetail = function (id) {
        return this.http.get(this.baseUri + ("Bank/GetCustomFieldDetail?id=" + id));
    };
    CustomfieldService.prototype.GetCustomFieldList = function (moduleId, SubModuleId, sortColumn, sortDir, page, pageSize, userId) {
        var _this = this;
        return this.http.get(this.baseUri + ("Bank/GetCustomFieldList?moduleId=" + moduleId + "&SubModuleId=" + SubModuleId + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&userId=" + userId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    CustomfieldService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] }
    ]; };
    CustomfieldService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"]])
    ], CustomfieldService);
    return CustomfieldService;
}());

var CustomFieldModel = /** @class */ (function () {
    function CustomFieldModel() {
        this.moduleName = "";
        this.subModuleName = "";
        this.fieldName = "";
        this.custText = "";
        this.custInteger = "";
        this.custDecimalLength = "";
        this.CustLogInterger = "";
        this.description = "";
        this.custUrl = "";
        this.custSelectList = "";
        this.id = "";
        this.isRequired = "";
        this.dataTypeCode = "";
        this.decimalPlaceValue = "";
    }
    return CustomFieldModel;
}());



/***/ }),

/***/ "./src/app/views/customfield/customfieldlist.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/customfield/customfieldlist.component.ts ***!
  \****************************************************************/
/*! exports provided: CustomfieldlistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomfieldlistComponent", function() { return CustomfieldlistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _customfield_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./customfield.service */ "./src/app/views/customfield/customfield.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
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








var CustomfieldlistComponent = /** @class */ (function () {
    function CustomfieldlistComponent(customfieldService, commonService, router, dialogService, toaster) {
        var _this = this;
        this.customfieldService = customfieldService;
        this.commonService = commonService;
        this.router = router;
        this.dialogService = dialogService;
        this.toaster = toaster;
        this.loadSave = false;
        this.pagedData = {
            pager: {},
            data: []
        };
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'name';
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    CustomfieldlistComponent.prototype.ngOnInit = function () {
        this.LoadCustomFieldsLength();
        this.search();
        this.getPageSizes();
    };
    CustomfieldlistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
        // console.log("PageSizeLst", this.lstPageSize);
    };
    CustomfieldlistComponent.prototype.search = function () {
        var _this = this;
        this.loading = true;
        this.pageSizeValue = 10;
        this.customfieldService.GetCustomFieldList(this.moduleId, this.SubModuleId, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.customfieldService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CustomfieldlistComponent.prototype.reset = function () {
        var _this = this;
        this.table.sorts = [];
        this.loading = true;
        this.moduleId = '';
        this.sortDir = 'asc';
        this.SubModuleId = '';
        this.clearDrop.clearModel();
        this.clearDropSub.clearModel();
        //this.sortColumn = 'emailTemplateCreatedOn';
        this.pageSizeValue = 10;
        this.customfieldService.GetCustomFieldList(this.moduleId, this.SubModuleId, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.customfieldService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CustomfieldlistComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.customfieldService.GetCustomFieldList(this.moduleId, this.SubModuleId, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.customfieldService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CustomfieldlistComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.customfieldService.GetCustomFieldList(this.moduleId, this.SubModuleId, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.customfieldService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CustomfieldlistComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.loading = true;
        // console.log("Events", $event.page - 1);
        this.customfieldService.GetCustomFieldList(this.moduleId, this.SubModuleId, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.customfieldService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CustomfieldlistComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    CustomfieldlistComponent.prototype.LoadCustomFieldsLength = function () {
        var _this = this;
        this.commonService.getMasterItemsList("custom_modules").subscribe(function (res) {
            _this.lstModuleList = _this.commonService.masters;
        });
    };
    CustomfieldlistComponent.prototype.onChangeModuleName = function ($event) {
        var _this = this;
        this.moduleId = $event.value;
        // console.log("$Event", $event);
        this.commonService.getMasterSubModuleList("custom_sub_modules", $event.value).subscribe(function (res) {
            _this.lstSubModuleList = _this.commonService.masters;
            // console.log("sdddd", this.lstSubModuleList);
        });
    };
    CustomfieldlistComponent.prototype.SetSubModule = function ($event) {
        this.SubModuleId = $event.value;
    };
    CustomfieldlistComponent.prototype.restSubModuleddl = function () {
        this.SubModuleId = null;
    };
    CustomfieldlistComponent.prototype.restModuleNameddl = function () {
        this.moduleId = null;
    };
    CustomfieldlistComponent.ctorParameters = function () { return [
        { type: _customfield_service__WEBPACK_IMPORTED_MODULE_1__["CustomfieldService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('clearDrop', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__["NgSelectComponent"])
    ], CustomfieldlistComponent.prototype, "clearDrop", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('clearDropSub', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__["NgSelectComponent"])
    ], CustomfieldlistComponent.prototype, "clearDropSub", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__["DatatableComponent"])
    ], CustomfieldlistComponent.prototype, "table", void 0);
    CustomfieldlistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-customfieldlist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./customfieldlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/customfield/customfieldlist.component.html")).default
        }),
        __metadata("design:paramtypes", [_customfield_service__WEBPACK_IMPORTED_MODULE_1__["CustomfieldService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
    ], CustomfieldlistComponent);
    return CustomfieldlistComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-customfield-customfield-module.js.map