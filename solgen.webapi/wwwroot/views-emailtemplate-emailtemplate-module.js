(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-emailtemplate-emailtemplate-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/emailtemplate/emailtemplate-add-edit.component.html":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/emailtemplate/emailtemplate-add-edit.component.html ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!--<div class=\"breadcrumb-holder\">\r\n  <div class=\"container-fluid\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-9 mt-3\">\r\n        <span class=\"dash\">Email Template</span>\r\n        <ul class=\"breadcrumb\">\r\n          <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n          <li class=\"breadcrumb-item\"><a routerLink=\"/emailtemplates\">Email Template</a></li>\r\n          <li class=\"breadcrumb-item active\">{{pageTitle}}</li>\r\n        </ul>\r\n      </div>\r\n      <div class=\"col-md-3 mt-4 text-right\">\r\n        <button class=\"w-auto sw-100 btn btn-dark\" (click)=\"close()\"><i class=\"fa fa-arrow-left\"></i>&nbsp;Back</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>-->\r\n\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Email Template</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li>\r\n        <a routerLink=\"/emailtemplates\">Email Template</a>\r\n      </li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \">\r\n\r\n    <form [formGroup]=\"emailTemplateForm\" autocomplete=\"off\">\r\n      <div class=\"emailTemplate-box\" [ngClass]=\"{'disabled':loadSave}\">\r\n        <div class=\"row\">\r\n          <div  [ngClass]=\"{'col-sm-12 col-md-12':true,'col-lg-8 col-xl-9': submoduleCode== 'undefined' || submoduleCode!=null || submoduleCode==''}\">\r\n            <div class=\"row\">\r\n              <div class=\"col-12 col-md-6 col-lg-4\">\r\n                <label>Template Name:<span class=\"text-danger\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Enter Template Name\" [attr.disabled]=\"isDisabled\"\r\n                         formControlName=\"emailTemplateName\"\r\n                         [ngClass]=\"{'is-invalid': (emailTemplateName.invalid && (emailTemplateName.dirty || emailTemplateName.touched) && (emailTemplateName.errors?.required || emailTemplateName.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"emailTemplateName.invalid && (emailTemplateName.dirty || emailTemplateName.touched) && emailTemplateName.errors?.required\"\r\n                         style=\"color:red;\">Template Name is required</small>\r\n                  <small *ngIf=\"emailTemplateName.invalid && (emailTemplateName.dirty || emailTemplateName.touched) && emailTemplateName.errors?.maxlength\"\r\n                         cstyle=\"color:red;\">Template Name must be less than 50 characters.</small>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <div class=\"col-12 col-md-6 col-lg-4\">\r\n                <label>Subject:</label>\r\n                <div class=\"form-group\">\r\n                  <input type=\"text\" class=\"form-control\" placeholder=\"Enter Subject\"\r\n                         formControlName=\"emailTemplateSubject\"\r\n                         [ngClass]=\"{'is-invalid': (emailTemplateSubject.invalid && (emailTemplateSubject.dirty || emailTemplateSubject.touched) && (emailTemplateSubject.errors?.required || emailTemplateSubject.errors?.maxlength)) }\">\r\n                  <small *ngIf=\"emailTemplateSubject.invalid && (emailTemplateSubject.dirty || emailTemplateSubject.touched) && emailTemplateSubject.errors?.required\"\r\n                         class=\"text-danger\">Subject  is required</small>\r\n                  <small *ngIf=\"emailTemplateSubject.invalid && (emailTemplateSubject.dirty || emailTemplateSubject.touched) && emailTemplateSubject.errors?.maxlength\"\r\n                         style=\"color:red;\">Subject must be less than 50 characters.</small>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-12 col-md-6 col-lg-4\">\r\n                <label>Status:<span style=\"color:red\">*</span></label>\r\n                <div class=\"form-group\">\r\n\r\n                  <ng-select [items]=\"statuses\" [loading]=\"loadSave\" [closeOnSelect]=\"true\" placeholder=\"Select status\" formControlName=\"emailTemplateStatusId\"\r\n                             bindLabel=\"text\" bindValue=\"valueGuid\"\r\n                             [ngClass]=\"{'is-invalid': (emailTemplateStatusId.invalid && (emailTemplateStatusId.dirty || emailTemplateStatusId.touched) && emailTemplateStatusId.errors?.required) }\"></ng-select>\r\n                  <small *ngIf=\"emailTemplateStatusId.invalid && (emailTemplateStatusId.dirty || emailTemplateStatusId.touched) && emailTemplateStatusId.errors?.required\"\r\n                         style=\"color:red;\">Please select Status</small>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-12 col-md-6 col-lg-4\">\r\n                <label>Module:</label>\r\n                <div class=\"form-group\">\r\n                  <ng-select #module [items]=\"modulelist\"\r\n                             placeholder=\"Select Module\" bindValue=\"value\"\r\n                             formControlName=\"selectedValue\"\r\n                             bindLabel=\"text\" (change)=\"selectmodule($event)\"\r\n                             [ngClass]=\"{'is-invalid': (selectedValue.invalid && (selectedValue.dirty || selectedValue.touched) && (selectedValue.errors?.required || selectedValue.errors?.maxlength)) }\">\r\n                  </ng-select>\r\n                  <small *ngIf=\"selectedValue.invalid && (selectedValue.dirty || selectedValue.touched) && selectedValue.errors?.required\"\r\n                         class=\"text-danger\">Module is required</small>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-12 col-md-6 col-lg-4\">\r\n                <label>SubModule:</label>\r\n                <div>\r\n                  <ng-select #subModule [items]=\"submodulelist\"\r\n                             placeholder=\"Select SubModule\" bindValue=\"value\"\r\n                             formControlName=\"selectedSubModuleValue\"\r\n                             bindLabel=\"text\" (change)=\"selectedModuleValue($event)\"\r\n                             [ngClass]=\"{'is-invalid': (selectedSubModuleValue.invalid && (selectedSubModuleValue.dirty || selectedSubModuleValue.touched) && (selectedSubModuleValue.errors?.required || selectedSubModuleValue.errors?.maxlength)) }\">\r\n                  </ng-select>\r\n                  <small *ngIf=\"selectedSubModuleValue.invalid && (selectedSubModuleValue.dirty || selectedSubModuleValue.touched) && selectedSubModuleValue.errors?.required\"\r\n                         class=\"text-danger\">SubModule is required</small>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <label>Template:<span style=\"color:red\">*</span></label>\r\n                <div class=\"form-group\">\r\n                  <ckeditor #myckeditor name=\"myckeditor\"\r\n                            formControlName=\"template\"\r\n                            required\r\n                            [config]=\"ckeConfig\"\r\n                            debounce=\"500\"\r\n                            (paste)=\"onPaste($event)\"\r\n                            (change)=\"onChange($event)\">\r\n                  </ckeditor>\r\n                  <small *ngIf=\"template.invalid && (template.dirty || template.touched) && template.errors?.required\"\r\n                         style=\"color:red;\">Template  is required</small>\r\n                </div>\r\n              </div>\r\n\r\n            </div>\r\n            <div class=\"row mb-3\">\r\n              <div class=\"col-sm-12 col-md-12 text-right\">\r\n                <a href=\"javascript:void(0);\" *ngIf=\"addOrUpdatePermission\" class=\"btn btn-success mr-1\" (click)=\"save()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-lg-4 col-xl-3\" *ngIf=\"submoduleCode!= 'loanapplication' && submoduleCode!=null\">\r\n            <div class=\"row\">\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"card\">\r\n                  <div class=\"card-header datafield-header\">\r\n                    <p>The following fields can be included in your auto responder. They will be replaced with the data entered by the user in each of them.</p>\r\n                    <p>Double-Click the fields to automatically paste them into the editor.</p>\r\n                  </div>\r\n                  <div class=\"card-body datafields\">\r\n                    <div class=\"row p-2 m-0 datafield-db\" *ngFor=\"let option of customCompnentValues;\" (click)=\"FillEditorData(option.display_name,option.name)\">\r\n                      <div class=\"col-10 col-sm-10 col-md- 10 col-lg-10 col-xl-10 pl-0 float-left\">\r\n                        <label class=\"m-0\" style=\"cursor: pointer;\">{{option.display_name}}</label>\r\n                      </div>\r\n                      <div class=\"col-2 col-sm-2 col-md- 2 col-lg-2 col-xl-2 float-left text-right m-0 pr-0\">\r\n                        <a href=\"javascript:void(0);\"><i class=\"fa fa-reply text-primary\"></i></a>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSaveDrp\" class=\"loader\"></app-loader>\r\n          </div>\r\n          <div class=\"col-lg-4 col-xl-3\" *ngIf=\"submoduleCode=='loanapplication'\">\r\n            <div class=\"row\">\r\n              <div class=\"col-12 col-md-12 col-lg-12\">\r\n                <div class=\"card-header datafield-header\">\r\n                  <p>The following fields can be included in your auto responder. They will be replaced with the data entered by the user in each of them.</p>\r\n                  <p>Double-Click the fields to automatically paste them into the editor.</p>\r\n                </div>\r\n\r\n                <div id=\"accordion\">\r\n                  <div class=\"card\" *ngFor=\"let option of groupNamedata; let c=index;\">\r\n                    <div class=\"card-header\" id=\"headingOne\">\r\n                      <h5 class=\"mb-0\">\r\n                        <a class=\"btn btn-link cursor-pointer\" data-toggle=\"collapse\" attr.data-target=\"#{{option.groupNameKey}}\" aria-expanded=\"true\" aria-controls=\"collapseOne_c\">\r\n                          {{option.groupName}}\r\n                        </a>\r\n                      </h5>\r\n                    </div>\r\n                    <div id=\"{{option.groupNameKey}}\" class=\"collapse hide\" aria-labelledby=\"headingOne\" data-parent=\"#accordion\">\r\n                      <div class=\"card-body\">\r\n                        <div class=\"row p-2 m-0 datafield-db\" *ngFor=\"let item1 of option.tableFields\" (click)=\"FillEditorDataForLoanApplication(item1.displayName,item1.tableName)\">\r\n                          <div class=\"col-10 col-sm-10 col-md- 10 col-lg-10 col-xl-10 pl-0 float-left\">\r\n                            <label class=\"m-0\" style=\"cursor: pointer;\">{{item1.formFieldName}}</label>\r\n                          </div>\r\n                          <div class=\"col-2 col-sm-2 col-md- 2 col-lg-2 col-xl-2 float-left text-right m-0 pr-0\">\r\n                            <a href=\"javascript:void(0);\"><i class=\"fa fa-reply text-primary\"></i></a>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <!--<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>-->\r\n          </div>\r\n        \r\n      </div>\r\n        </div>\r\n    </form>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/emailtemplate/emailtemplate-listing.component.html":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/emailtemplate/emailtemplate-listing.component.html ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Breadcrumb-->\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Email Template</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Email Template</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3 btn-iconres\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-6\">\r\n            <div class=\"row searchfield \">\r\n              <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-lg-8 float-left pl-3 pl-lg-0\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i> </span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i> </span></a>\r\n                <!--<a class=\"btn btn-white mr-1\" href=\"javascript:void(0);\" (click)=\"popUpOpen()\"><span><i class=\"fa fa-filter\"></i> Filter</span></a>-->\r\n              </div>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"col-md-12 col-xl-6\">\r\n            <div class=\"dt-buttons\">\r\n              <a *ngIf='isAdd' [routerLink]=\"['/emailtemplates/create']\" class=\"btn btn-success form-btns  mr-1\" tooltip=\"Add Email Template\"><i class=\"fa fa-plus\"></i> </a>\r\n            </div>\r\n          </div>\r\n          <!--<div class=\"col-md-6\">\r\n    <div class=\"dt-buttons\">\r\n      <a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\"><span><i class=\"fa fa-list-alt\"></i> Manage View</span></a>\r\n    </div>\r\n  </div>-->\r\n        </div>\r\n      </div>\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rows]=\"pagedData.data\"\r\n                          [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                       [columnMode]=\"'force'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"50\"\r\n                       \r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"pagedData.pager.totalItems\"\r\n                       [offset]=\"pagedData.pager.currentPage\"\r\n                       [limit]=\"pagedData.pager.pageSize\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\">\r\n          <!--<ngx-datatable-column name=\"Name\" prop=\"EmailTemplateName\" [sortable]=\"true\" >\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              {{row.EmailTemplateName}}\r\n            </ng-template>\r\n          </ngx-datatable-column>-->\r\n          <ngx-datatable-column name=\"Name\" prop=\"EmailTemplateName\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <a [routerLink]=\"['/emailtemplates/edit',row.EmailTemplateIdAuto]\" title=\"Edit\">{{row.EmailTemplateName}}</a>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Module Name\" [sortable]=\"true\" prop=\"module_name\">\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-column name=\"Sub Module Name\" [sortable]=\"true\" prop=\"sub_module_name\">\r\n          </ngx-datatable-column>\r\n\r\n          <!--<ngx-datatable-column name=\"IsActive\" prop=\"IsActive\" sortable=\"false\" headerClass=\"text-center\"\r\n                                *ngIf='modulePermission!==null && modulePermission.roleModuleUpdateFlag' [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div class=\"text-center\" *ngIf=\"row.IsActive == 0\">\r\n                <a href=\"javascript:void(0);\" (click)=\"enable(row)\"><i title=\"Click to enable.\" class=\"fa fa-times text-danger icon_tick\"></i></a>\r\n              </div>\r\n              <div class=\"text-center\" *ngIf=\"row.IsActive == 1\">\r\n                <a href=\"javascript:void(0);\" (click)=\"disable(row)\"><i title=\"Click to disable.\" class=\"fa fa-check text-success icon_tick\"></i></a>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>-->\r\n          <ngx-datatable-column name=\"Is Active\" prop=\"IsActive\" sortable=\"false\" headerClass=\"text-center\"\r\n                                *ngIf='isUpdate' [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div class=\"text-center\" *ngIf=\"row.IsActive == 0\">\r\n                <span><i class=\"fa fa-times text-danger icon_tick\"></i></span>\r\n              </div>\r\n              <div class=\"text-center\" *ngIf=\"row.IsActive == 1\">\r\n                <span><i class=\"fa fa-check text-success icon_tick\"></i></span>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\"\r\n                                *ngIf='isDelete' [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div class=\"text-center\">\r\n            \r\n                <a [routerLink]=\"['/emailtemplates/edit',row.EmailTemplateIdAuto]\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                <a *ngIf='row.EmailTemplateIsDefault == 0 && row.CanDelete' href=\"javascript:void(0);\" (click)=\"deleteEmailTemplate(row)\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"currentPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div class=\"page-count\">\r\n                {{rowCount}} total\r\n              </div>\r\n              <div>\r\n                <div class=\"page-size-record\">\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                               [page]=\"pagedData.pager.currentPage+1\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"pagedData.pager.totalItems\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/views/emailtemplate/emailtemplate-add-edit.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/views/emailtemplate/emailtemplate-add-edit.component.scss ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2VtYWlsdGVtcGxhdGUvZW1haWx0ZW1wbGF0ZS1hZGQtZWRpdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/emailtemplate/emailtemplate-add-edit.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/views/emailtemplate/emailtemplate-add-edit.component.ts ***!
  \*************************************************************************/
/*! exports provided: EmailtemplateAddEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailtemplateAddEditComponent", function() { return EmailtemplateAddEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _emailtemplate_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emailtemplate.service */ "./src/app/views/emailtemplate/emailtemplate.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _master_master_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../master/master.service */ "./src/app/views/master/master.service.ts");
/* harmony import */ var _managelayout_layout_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../managelayout/layout.service */ "./src/app/views/managelayout/layout.service.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
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









var EmailtemplateAddEditComponent = /** @class */ (function () {
    function EmailtemplateAddEditComponent(fb, layoutservice, emailTemplateService, commonService, masterService, router, toaster, route) {
        this.fb = fb;
        this.layoutservice = layoutservice;
        this.emailTemplateService = emailTemplateService;
        this.commonService = commonService;
        this.masterService = masterService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        //selectedValue: any;
        this.loadSaveDrp = false;
        this.searchUserType = '';
        this.loading = false;
        this.sortDir = 'desc';
        this.sortColumn = 'Id';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.modulecode = 0;
        this.loadSave = false;
        this.customCompnentValues = [];
        this.addOrUpdatePermission = false;
        this.groupName = [];
        this.formControlList = [];
        this.groupNamedata = [];
        this.groupTables = [];
        this.loanApplicationFormFields = [];
        this.emailTemplate = new _emailtemplate_service__WEBPACK_IMPORTED_MODULE_2__["EmailTemplate"]();
        this.modulePermission = [];
        this.groupBy1 = function (array, key) {
            // Return the end result
            return array.reduce(function (result, currentValue) {
                // If an array already present for key, push it to the array. Else create an array and push the object
                (result[currentValue[key.trim()]] = result[currentValue[key]] || []).push(currentValue);
                // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
                return result;
            }, []); // empty object is the initial value for result object
        };
        var priviledgeCode = this.route.snapshot.data.privilegeCode;
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == priviledgeCode.toUpperCase(); });
        if (add == undefined) {
            this.addOrUpdatePermission = false;
        }
        else {
            this.addOrUpdatePermission = true;
        }
        this.mycontent = "<p>Enter content</p>";
    }
    EmailtemplateAddEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isDisabled = null;
        this.getModuleddl();
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
            }
        });
        this.getStatuses();
        this.initForm();
    };
    EmailtemplateAddEditComponent.prototype.onChange = function ($event) {
    };
    EmailtemplateAddEditComponent.prototype.onPaste = function ($event) {
    };
    EmailtemplateAddEditComponent.prototype.getStatuses = function () {
        var _this = this;
        this.commonService.getMasterItemsList("Status").subscribe(function (response) {
            _this.statuses = _this.commonService.masters;
        });
    };
    EmailtemplateAddEditComponent.prototype.save = function () {
        var _this = this;
        if (this.emailTemplateForm.valid) {
            this.loadSave = true;
            // console.log(this.emailTemplateForm.value)
            this.emailTemplateService.saveEmailTemplate(this.emailTemplateForm.value).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.router.navigateByUrl("/emailtemplates");
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
            this.commonService.validateAllFormFields(this.emailTemplateForm);
        }
    };
    EmailtemplateAddEditComponent.prototype.getEmailTemplate = function (id) {
        var _this = this;
        this.emailTemplateService.getEmailTemplateById(id)
            .subscribe(function (emailTemplate) {
            _this.displayEmailTemplate(emailTemplate);
            _this.loadSave = false;
        }, function (error) {
            _this.loadSave = false;
        });
    };
    EmailtemplateAddEditComponent.prototype.displayEmailTemplate = function (emailTemplate) {
        this.emailTemplate = emailTemplate;
        console.log('emailTemplate ', this.emailTemplate);
        this.isDisabled = true;
        this.getSubModuleList(this.emailTemplate.selectedValue);
        this.pageTitle = "Edit Email Template: " + this.emailTemplate.emailTemplateName;
        this.emailTemplateForm.patchValue({
            emailTemplateId: this.emailTemplate.emailTemplateId,
            emailTemplateName: this.emailTemplate.emailTemplateName,
            emailTemplateSubject: this.emailTemplate.emailTemplateSubject,
            selectedValue: this.emailTemplate.selectedValue,
            selectedSubModuleValue: this.emailTemplate.selectedSubModuleValue,
            template: this.emailTemplate.template,
            emailTemplateStatusId: this.emailTemplate.emailTemplateStatusId,
        });
        // this.modulenamecode = this.emailTemplate.moduleName.trim().toLowerCase().replace(' ', '');
        //this.submoduleCode = this.emailTemplate.subModuleName.trim().toLowerCase().replace(' ', '');
        if (this.emailTemplate.moduleName == null) {
            this.modulenamecode = null;
        }
        else {
            this.modulenamecode = this.emailTemplate.moduleName.trim().toLowerCase().replace(' ', '');
        }
        if (this.emailTemplate.subModuleName == null) {
            this.submoduleCode = null;
        }
        else {
            this.submoduleCode = this.emailTemplate.subModuleName.trim().toLowerCase().replace(' ', '');
        }
        if (this.submoduleCode != 'loanapplication') {
            this.getCustomeFields();
        }
        if (this.submoduleCode == 'loanapplication') {
            this.getcustomFieldForLoanApplication();
        }
    };
    EmailtemplateAddEditComponent.prototype.FillEditorData = function (displayName, name) {
        this.ckeditor.instance.insertText('@' + name);
        console.log("displayName", displayName);
        console.log("name", name);
    };
    EmailtemplateAddEditComponent.prototype.FillEditorDataForLoanApplication = function (displayName, tablename) {
        this.ckeditor.instance.insertText('@' + displayName + '_' + tablename);
    };
    EmailtemplateAddEditComponent.prototype.getModuleddl = function () {
        var _this = this;
        this.commonService.getMasterItemsList('custom_modules').subscribe(function (result) {
            _this.modulelist = _this.commonService.masters;
            if (_this.id != null) {
                for (var i = 0; i < _this.modulelist.length; i++) {
                    var s = _this.modulelist[i];
                    if (s.text == _this.id) {
                        var value = s.value;
                        var text = s.text;
                        //this.selectedValue = value.toString();
                        _this.SelectedText = text.toString();
                        _this.selectmoduleValue(_this.selectedValue, _this.SelectedText);
                        // console.log('value ', this.selectedValue)          
                    }
                }
            }
        });
    };
    EmailtemplateAddEditComponent.prototype.selectmodule = function (event) {
        if (typeof event === 'undefined') {
            this.modulecode = 0;
        }
        else {
            this.submodulelist = '';
            this.modulecode = (event.value);
            this.modulenamecode = (event.text);
            this.getSubModuleList(this.modulecode);
        }
    };
    EmailtemplateAddEditComponent.prototype.getSubModuleList = function (id) {
        var _this = this;
        this.commonService.getMasterSubModuleList(id, 'custom_sub_modules').subscribe(function (response) {
            _this.submodulelist = _this.commonService.masters;
            // console.log('submodulelist',this.submodulelist);
        });
    };
    EmailtemplateAddEditComponent.prototype.selectedModuleValue = function (event) {
        var _this = this;
        //this.loadSave = true;
        this.submoduleCode = (event.text.trim().toLowerCase().replace(' ', ''));
        if (this.submoduleCode == 'loanapplication') {
            this.loadSave = true;
            this.emailTemplateService.GetCustomFormFieldList(this.modulenamecode.trim().toLowerCase().replace(' ', ''), this.submoduleCode.trim().toLowerCase().replace(' ', ''), '', '').subscribe(function (result) {
                if (result) {
                    _this.formControlList = [];
                    _this.customCompnentValues = [];
                    _this.customCompnentValues = _this.emailTemplateService.customFieldsList;
                    _this.groupName = [];
                    console.log(_this.customCompnentValues);
                    _this.groupName = _this.groupBy1(_this.customCompnentValues, 'tableName');
                    // console.log("customCompnentValues", this.customCompnentValues);
                    _this.formControlList = [];
                    //console.log("form02502", this.formControlList);
                    _this.customCompnentValues.forEach(function (m) {
                        var groupCheck = _this.formControlList.filter(function (y) { return y.groupName == m.tableName; });
                        if (groupCheck == null || groupCheck.length == 0) {
                            var obj = {
                                groupName: m.tableName,
                                groupNameKey: 'collapseOne_' + String(m.tableName).split(' ').join('_'),
                                tableFields: _this.customCompnentValues.filter(function (y) { return y.tableName == m.tableName; })
                            };
                            _this.formControlList.push(obj);
                        }
                    });
                    //let data: any[] = [];
                    /* for (var i = 0; i < this.formControlList.length; i++) {
                       let isGroupFound = false;
                       for (var j = 0; j < this.groupNamedata.length; j++) {
                         if (this.groupNamedata[j].groupName === this.formControlList[i].groupName) {
                           isGroupFound = true;
                           break;
                         }
                       }
                       if (isGroupFound == false) {
                         console.log("checkData", this.formControlList[i].groupName);
                         
                         this.groupNamedata.push(this.formControlList[i]);
           
                       }
                     }
                     */
                    _this.groupNamedata = _this.formControlList;
                    console.log("checkData", _this.formControlList);
                    //this.formControlList.filter(w => w.groupName = "")
                    //console.log("formControlList", this.formControlList);
                    //console.log("form02502", this.formControlList);
                }
            });
            //this.emailTemplateService.GetCustomFormFieldList(this.modulenamecode.trim().toLowerCase().replace(' ', '').subscribe((result: any) => {
            //  if (result) {
            //    this.customCompnentValues = this.emailTemplateService.customFieldsList;
            //    console.log("CustomFormFields", this.emailTemplateService.customFieldsList);
            //  }
            //})
        }
        else {
            this.loadSave = true;
            this.emailTemplateService.GetCustomFieldsList(this.modulenamecode.trim().toLowerCase().replace(' ', ''), this.submoduleCode.trim().toLowerCase().replace(' ', ''), '', '').subscribe(function (result) {
                if (result) {
                    _this.customCompnentValues = _this.emailTemplateService.customFieldsList.data;
                    //console.log("customCompnentValues", this.customCompnentValues);
                }
            });
        }
        this.loadSave = false;
    };
    EmailtemplateAddEditComponent.prototype.formstagedatasubForEmailTemplateFor = function (item) {
        var itemsdata = this.groupName.filter(function (x) { return x.ParentId == item; });
        return itemsdata;
    };
    EmailtemplateAddEditComponent.prototype.getCustomeFields = function () {
        var _this = this;
        var moduleCodefor;
        var subModuleCode;
        if (this.modulenamecode != null) {
            moduleCodefor = this.modulenamecode.trim().toLowerCase().replace(' ', '');
        }
        if (this.submoduleCode != null) {
            subModuleCode = this.submoduleCode.trim().toLowerCase().replace(' ', '');
        }
        this.emailTemplateService.GetCustomFieldsList(moduleCodefor, subModuleCode, '', '').subscribe(function (result) {
            if (result) {
                _this.customCompnentValues = _this.emailTemplateService.customFieldsList.data;
                console.log("customCompnentValues", _this.customCompnentValues);
            }
        });
    };
    EmailtemplateAddEditComponent.prototype.getcustomFieldForLoanApplication = function () {
        var _this = this;
        this.emailTemplateService.GetCustomFormFieldList(this.modulenamecode.trim().toLowerCase().replace(' ', ''), this.submoduleCode.trim().toLowerCase().replace(' ', ''), '', '').subscribe(function (result) {
            if (result) {
                _this.formControlList = [];
                _this.customCompnentValues = [];
                _this.customCompnentValues = _this.emailTemplateService.customFieldsList;
                _this.groupName = [];
                console.log(_this.customCompnentValues);
                _this.groupName = _this.groupBy1(_this.customCompnentValues, 'tableName');
                // console.log("customCompnentValues", this.customCompnentValues);
                _this.formControlList = [];
                //console.log("form02502", this.formControlList);
                _this.customCompnentValues.forEach(function (m) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.groupName == m.tableName; });
                    if (groupCheck == null || groupCheck.length == 0) {
                        var obj = {
                            groupName: m.tableName,
                            groupNameKey: 'collapseOne_' + String(m.tableName).split(' ').join('_'),
                            tableFields: _this.customCompnentValues.filter(function (y) { return y.tableName == m.tableName; })
                        };
                        _this.formControlList.push(obj);
                    }
                });
                //let data: any[] = [];
                /* for (var i = 0; i < this.formControlList.length; i++) {
                   let isGroupFound = false;
                   for (var j = 0; j < this.groupNamedata.length; j++) {
                     if (this.groupNamedata[j].groupName === this.formControlList[i].groupName) {
                       isGroupFound = true;
                       break;
                     }
                   }
                   if (isGroupFound == false) {
                     console.log("checkData", this.formControlList[i].groupName);
                     
                     this.groupNamedata.push(this.formControlList[i]);
        
                   }
                 }
                 */
                _this.groupNamedata = _this.formControlList;
                console.log("checkData", _this.formControlList);
                //this.formControlList.filter(w => w.groupName = "")
                //console.log("formControlList", this.formControlList);
                //console.log("form02502", this.formControlList);
            }
        });
    };
    EmailtemplateAddEditComponent.prototype.selectmoduleValue = function (value, text) {
        if (value != null) {
            this.modulecode = value;
            this.modulenamecode = text;
        }
        else {
            this.modulecode = 0;
        }
    };
    EmailtemplateAddEditComponent.prototype.close = function () {
        this.router.navigate(['/emailtemplates']);
    };
    EmailtemplateAddEditComponent.prototype.initForm = function () {
        this.emailTemplateForm = this.fb.group({
            'emailTemplateId': [this.emailTemplate.emailTemplateId, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator],
            'emailTemplateName': [this.emailTemplate.emailTemplateName, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(50)]],
            'emailTemplateSubject': [this.emailTemplate.emailTemplateSubject, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator]],
            'template': [this.emailTemplate.template, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            'emailTemplateStatusId': [this.emailTemplate.emailTemplateStatusId, [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]],
            'selectedValue': [this.emailTemplate.selectedValue == '' ? null : this.emailTemplate.selectedValue],
            'selectedSubModuleValue': [this.emailTemplate.selectedSubModuleValue == '' ? null : this.emailTemplate.selectedSubModuleValue],
        });
    };
    Object.defineProperty(EmailtemplateAddEditComponent.prototype, "emailTemplateId", {
        get: function () { return this.emailTemplateForm.get('emailTemplateId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmailtemplateAddEditComponent.prototype, "emailTemplateName", {
        get: function () { return this.emailTemplateForm.get('emailTemplateName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmailtemplateAddEditComponent.prototype, "emailTemplateSubject", {
        get: function () { return this.emailTemplateForm.get('emailTemplateSubject'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmailtemplateAddEditComponent.prototype, "emailTemplateStatusId", {
        get: function () { return this.emailTemplateForm.get('emailTemplateStatusId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmailtemplateAddEditComponent.prototype, "template", {
        get: function () { return this.emailTemplateForm.get('template'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmailtemplateAddEditComponent.prototype, "selectedValue", {
        get: function () { return this.emailTemplateForm.get('selectedValue'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EmailtemplateAddEditComponent.prototype, "selectedSubModuleValue", {
        get: function () { return this.emailTemplateForm.get('selectedSubModuleValue'); },
        enumerable: true,
        configurable: true
    });
    EmailtemplateAddEditComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _managelayout_layout_service__WEBPACK_IMPORTED_MODULE_7__["LayoutService"] },
        { type: _emailtemplate_service__WEBPACK_IMPORTED_MODULE_2__["EmailTemplateService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _master_master_service__WEBPACK_IMPORTED_MODULE_6__["MasterService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('module', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_8__["NgSelectComponent"])
    ], EmailtemplateAddEditComponent.prototype, "module", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('subModule', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_8__["NgSelectComponent"])
    ], EmailtemplateAddEditComponent.prototype, "subModule", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("myckeditor", { static: false }),
        __metadata("design:type", Object)
    ], EmailtemplateAddEditComponent.prototype, "ckeditor", void 0);
    EmailtemplateAddEditComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-emailtemplate-add-edit',
            template: __importDefault(__webpack_require__(/*! raw-loader!./emailtemplate-add-edit.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/emailtemplate/emailtemplate-add-edit.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./emailtemplate-add-edit.component.scss */ "./src/app/views/emailtemplate/emailtemplate-add-edit.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _managelayout_layout_service__WEBPACK_IMPORTED_MODULE_7__["LayoutService"],
            _emailtemplate_service__WEBPACK_IMPORTED_MODULE_2__["EmailTemplateService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _master_master_service__WEBPACK_IMPORTED_MODULE_6__["MasterService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], EmailtemplateAddEditComponent);
    return EmailtemplateAddEditComponent;
}());



/***/ }),

/***/ "./src/app/views/emailtemplate/emailtemplate-listing.component.scss":
/*!**************************************************************************!*\
  !*** ./src/app/views/emailtemplate/emailtemplate-listing.component.scss ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2VtYWlsdGVtcGxhdGUvZW1haWx0ZW1wbGF0ZS1saXN0aW5nLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/emailtemplate/emailtemplate-listing.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/views/emailtemplate/emailtemplate-listing.component.ts ***!
  \************************************************************************/
/*! exports provided: EmailtemplateListingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailtemplateListingComponent", function() { return EmailtemplateListingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _emailtemplate_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emailtemplate.service */ "./src/app/views/emailtemplate/emailtemplate.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
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







var EmailtemplateListingComponent = /** @class */ (function () {
    function EmailtemplateListingComponent(router, emailTemplateService, dialogService, toaster, commonService, activeRoute) {
        var _this = this;
        this.router = router;
        this.emailTemplateService = emailTemplateService;
        this.dialogService = dialogService;
        this.toaster = toaster;
        this.commonService = commonService;
        this.activeRoute = activeRoute;
        //modulePermission: ModuleList;
        this.id = "";
        this.loading = false;
        this.sortDir = 'asc';
        this.sortColumn = 'EmailTemplateName';
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
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'EMAILTEMPLATEADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'EMAILTEMPLATEUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'EMAILTEMPLATEDELETE'; });
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
    EmailtemplateListingComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.refresh();
    };
    EmailtemplateListingComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    EmailtemplateListingComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    EmailtemplateListingComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.emailTemplateService.getEmailTemplatesList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.emailTemplateService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    EmailtemplateListingComponent.prototype.search = function () {
        var _this = this;
        this.loading = true;
        this.emailTemplateService.getEmailTemplatesList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.emailTemplateService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    EmailtemplateListingComponent.prototype.reset = function () {
        var _this = this;
        this.table.sorts = [];
        this.loading = true;
        this.listFilter = '';
        this.sortDir = 'asc';
        this.sortColumn = 'emailTemplateCreatedOn';
        this.pageSizeValue = 10;
        this.emailTemplateService.getEmailTemplatesList(this.listFilter, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.emailTemplateService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    EmailtemplateListingComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.loading = true;
        this.emailTemplateService.getEmailTemplatesList(this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.emailTemplateService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    EmailtemplateListingComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.emailTemplateService.getEmailTemplatesList(this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.emailTemplateService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    EmailtemplateListingComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.emailTemplateService.getEmailTemplatesList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.emailTemplateService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    EmailtemplateListingComponent.prototype.deleteEmailTemplate = function (emailTemplate) {
        var _this = this;
        var message = "Are you sure you want to delete email template \"" + emailTemplate.EmailTemplateName + "\"?";
        this.dialogService.confirm('Delete Email Template', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.emailTemplateService.deleteEmailTemplate(emailTemplate.EmailTemplateId).subscribe(function (response) {
                    if (response.responseMessage == "Success") {
                        _this.toaster.success("Email Template \"" + emailTemplate.EmailTemplateName + "\" has been deleted successfully");
                        _this.refresh();
                    }
                    else {
                        _this.toaster.error(response.responseMessage);
                    }
                }, function (error) {
                });
            }
        });
    };
    EmailtemplateListingComponent.prototype.disable = function (email) {
        var _this = this;
        var message = "Are you sure you want to disable this Email Template \"" + email.EmailTemplateName + "\"?";
        this.dialogService.confirm('Disable Email Template', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.emailTemplateService.changeStatus(email.EmailTemplateId).subscribe(function (r) {
                    _this.refresh();
                    _this.toaster.success("\"" + email.EmailTemplateName + "\" has been disabled   successfully ");
                }, function (error) {
                });
            }
        });
    };
    EmailtemplateListingComponent.prototype.enable = function (email) {
        var _this = this;
        var message = "Are you sure you want to enable this Email Template  \"" + email.EmailTemplateName + "\"?";
        this.dialogService.confirm('Enable Email Template', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.emailTemplateService.changeStatus(email.EmailTemplateId).subscribe(function (response) {
                    _this.refresh();
                    _this.toaster.success("\"" + email.EmailTemplateName + "\" has been enabled  successfully");
                }, function (error) {
                });
            }
        });
    };
    EmailtemplateListingComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _emailtemplate_service__WEBPACK_IMPORTED_MODULE_2__["EmailTemplateService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["DatatableComponent"])
    ], EmailtemplateListingComponent.prototype, "table", void 0);
    EmailtemplateListingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-emailtemplate-listing',
            template: __importDefault(__webpack_require__(/*! raw-loader!./emailtemplate-listing.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/emailtemplate/emailtemplate-listing.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./emailtemplate-listing.component.scss */ "./src/app/views/emailtemplate/emailtemplate-listing.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _emailtemplate_service__WEBPACK_IMPORTED_MODULE_2__["EmailTemplateService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_5__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], EmailtemplateListingComponent);
    return EmailtemplateListingComponent;
}());



/***/ }),

/***/ "./src/app/views/emailtemplate/emailtemplate-routing.module.ts":
/*!*********************************************************************!*\
  !*** ./src/app/views/emailtemplate/emailtemplate-routing.module.ts ***!
  \*********************************************************************/
/*! exports provided: EmailtemplateRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailtemplateRoutingModule", function() { return EmailtemplateRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _emailtemplate_listing_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emailtemplate-listing.component */ "./src/app/views/emailtemplate/emailtemplate-listing.component.ts");
/* harmony import */ var _emailtemplate_add_edit_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./emailtemplate-add-edit.component */ "./src/app/views/emailtemplate/emailtemplate-add-edit.component.ts");
/* harmony import */ var _auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../auth/auth.guard */ "./src/app/auth/auth.guard.ts");
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
        path: '', component: _emailtemplate_listing_component__WEBPACK_IMPORTED_MODULE_2__["EmailtemplateListingComponent"], data: { title: 'Email Template' }
    },
    {
        path: 'edit/:id', component: _emailtemplate_add_edit_component__WEBPACK_IMPORTED_MODULE_3__["EmailtemplateAddEditComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]], data: { privilegeCode: 'EMAILTEMPLATEUPDATE' }
    },
    {
        path: 'create', component: _emailtemplate_add_edit_component__WEBPACK_IMPORTED_MODULE_3__["EmailtemplateAddEditComponent"], canActivate: [_auth_auth_guard__WEBPACK_IMPORTED_MODULE_4__["AuthGuard"]], data: { privilegeCode: 'EMAILTEMPLATEADD' }
    },
];
var EmailtemplateRoutingModule = /** @class */ (function () {
    function EmailtemplateRoutingModule() {
    }
    EmailtemplateRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], EmailtemplateRoutingModule);
    return EmailtemplateRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/emailtemplate/emailtemplate.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/views/emailtemplate/emailtemplate.module.ts ***!
  \*************************************************************/
/*! exports provided: EmailtemplateModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmailtemplateModule", function() { return EmailtemplateModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _emailtemplate_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emailtemplate-routing.module */ "./src/app/views/emailtemplate/emailtemplate-routing.module.ts");
/* harmony import */ var _emailtemplate_add_edit_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./emailtemplate-add-edit.component */ "./src/app/views/emailtemplate/emailtemplate-add-edit.component.ts");
/* harmony import */ var _emailtemplate_listing_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./emailtemplate-listing.component */ "./src/app/views/emailtemplate/emailtemplate-listing.component.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm5/ng2-ckeditor.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};









var EmailtemplateModule = /** @class */ (function () {
    function EmailtemplateModule() {
    }
    EmailtemplateModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_emailtemplate_listing_component__WEBPACK_IMPORTED_MODULE_4__["EmailtemplateListingComponent"], _emailtemplate_add_edit_component__WEBPACK_IMPORTED_MODULE_3__["EmailtemplateAddEditComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _emailtemplate_routing_module__WEBPACK_IMPORTED_MODULE_2__["EmailtemplateRoutingModule"],
                _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_5__["NgSelectModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["NgxDatatableModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"],
                ng2_ckeditor__WEBPACK_IMPORTED_MODULE_8__["CKEditorModule"]
            ]
        })
    ], EmailtemplateModule);
    return EmailtemplateModule;
}());



/***/ })

}]);
//# sourceMappingURL=views-emailtemplate-emailtemplate-module.js.map