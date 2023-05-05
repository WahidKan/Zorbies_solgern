(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-manageinsurance-insurance-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageinsurance/addeditinsurance.component.html":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageinsurance/addeditinsurance.component.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-9 mt-3\">\r\n          <span class=\"dash\">Manage Insurance Company</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/insurance\">Manage Insurance Company</a></li>\r\n            <li class=\"breadcrumb-item active\">{{pageTitle}}</li>\r\n          </ul>\r\n        </div>\r\n        <div class=\"col-md-3 mt-4 text-right\">\r\n          <button class=\"w-auto sw-100 btn btn-dark\" (click)=\"Cancel()\"><i class=\"fa fa-arrow-left\"></i>&nbsp;Back</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n   \r\n  </div>\r\n  <section class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white border rounded pb-4\">\r\n            <div class=\"col-md-12 mt-4\">\r\n              <form [formGroup]=\"addInsuranceForm\" autocomplete=\"off\">\r\n                <div class=\"Insurance-box\" [ngClass]=\"{'disabled':loadSave}\">\r\n                  <div class=\"row\">\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Insurance Company Name:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Enter Insurance Company Name\"\r\n                               formControlName=\"name\"\r\n                               [ngClass]=\"{'is-invalid': (name.invalid && (name.dirty || name.touched) && (name.errors?.required || name.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors?.required\"\r\n                               class=\"text-danger\">Insurance Company Name is required</small>\r\n                        <small *ngIf=\"name.invalid && (name.dirty || name.touched) && name.errors?.maxlength\"\r\n                               class=\"text-danger\">Insurance Company Name must be less than 500 characters.</small>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Insurance Agent Name:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Enter Insurance Company Name\"\r\n                               formControlName=\"agentName\"\r\n                               [ngClass]=\"{'is-invalid': (agentName.invalid && (agentName.dirty || agentName.touched) && (agentName.errors?.required || agentName.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"agentName.invalid && (agentName.dirty || agentName.touched) && agentName.errors?.required\"\r\n                               class=\"text-danger\">Insurance Agent Name is required</small>\r\n                        <small *ngIf=\"agentName.invalid && (agentName.dirty || agentName.touched) && agentName.errors?.maxlength\"\r\n                               class=\"text-danger\">Insurance Agent Name must be less than 100 characters.</small>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Insurance Agent Email:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" formControlName=\"agentEmail\" placeholder=\"Enter Insurance Agent Email\"\r\n                               [ngClass]=\"{'is-invalid': (agentEmail.invalid && (agentEmail.dirty || agentEmail.touched) && (agentEmail.errors?.required || agentEmail.errors?.email)) }\">\r\n                        <small *ngIf=\"agentEmail.invalid && (agentEmail.dirty || agentEmail.touched) && agentEmail.errors?.required\"\r\n                               class=\"text-danger\">Email is required</small>\r\n                        <small *ngIf=\"agentEmail.invalid && (agentEmail.dirty || agentEmail.touched) && agentEmail.errors?.email\"\r\n                               class=\"text-danger\">Please enter valid email address</small>\r\n\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Insurance Phone:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <p-inputMask styleClass=\"form-control\" mask=\"(999) 999-9999\" formControlName=\"phone\" placeholder=\"(___) ___-____\" [ngClass]=\"{'is-invalid': (phone.invalid && (phone.dirty || phone.touched) && (phone.errors?.required || phone.errors?.pattern)) }\">\r\n                        </p-inputMask>\r\n                        <small *ngIf=\"phone.invalid && (phone.dirty || phone.touched) && phone.errors?.required\"\r\n                               class=\"text-danger\">Phone is required</small>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <!--<div class=\"col-12 col-md-6 col-lg-4\">\r\n    <label>Insurance Phone:<span class=\"text-danger\">*</span></label>\r\n    <div class=\"form-group\">\r\n      <input type=\"text\" class=\"form-control\" formControlName=\"phone\" maxlength=\"50\" placeholder=\"Enter Phone Number\"\r\n             [ngClass]=\"{'is-invalid': (phone.invalid && (phone.dirty || phone.touched) && (phone.errors?.required || phone.errors?.pattern)) }\" />\r\n      <small *ngIf=\"phone.invalid && (phone.dirty || phone.touched) && phone.errors?.required\"\r\n             class=\"text-danger\">Phone is required</small>\r\n      <small *ngIf=\"phone.touched && phone.errors?.pattern\"\r\n             class=\"text-danger\">Please enter valid Phone number.</small>\r\n    </div>\r\n  </div>-->\r\n\r\n\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Status:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <ng-select [items]=\"lstStatus\"\r\n                                   placeholder=\"Select Staus\" formControlName=\"statusId\" bindLabel=\"text\" bindValue=\"value\"\r\n                                   [ngClass]=\"{'is-invalid': (statusId.invalid && (statusId.dirty || statusId.touched) && statusId.errors?.required) }\"></ng-select>\r\n                        <small *ngIf=\"statusId.invalid && (statusId.dirty || statusId.touched) && statusId.errors?.required\" class=\"text-danger\">Please select statusId</small>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-12 col-lg-12\">\r\n                      <label class=\"m-label-s\">Insurance Company Address:</label>\r\n                      <hr size=\"4\" class=\"mt-0 border-secondary\">\r\n                    </div>\r\n\r\n\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Address:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <textarea type=\"text\" class=\"form-control\" formControlName=\"address\"\r\n                                  [ngClass]=\"{'is-invalid': (address.invalid && (address.dirty || address.touched) && (address.errors?.required || address.errors?.maxlength)) }\"></textarea>\r\n                        <small *ngIf=\"address.invalid && (address.dirty || address.touched) && address.errors?.required\"\r\n                               class=\"text-danger\">Address is required</small>\r\n                        <small *ngIf=\"address.invalid && (address.dirty || address.touched) && address.errors?.maxlength\"\r\n                               class=\"text-danger\">Address must be less than 500 characters.</small>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>City:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Enter City\" formControlName=\"city\"\r\n                               [ngClass]=\"{'is-invalid': (city.invalid && (city.dirty || city.touched) && (city.errors?.required || city.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"city.invalid && (city.dirty || city.touched) && city.errors?.required\"\r\n                               class=\"text-danger\">City is required</small>\r\n                        <small *ngIf=\"city.invalid && (city.dirty || city.touched) && city.errors?.maxlength\"\r\n                               class=\"text-danger\">City name must be less than 100 characters.</small>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>County:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Enter County\"\r\n                               formControlName=\"county\"\r\n                               [ngClass]=\"{'is-invalid': (county.invalid && (county.dirty || county.touched) && (county.errors?.required || county.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"county.invalid && (county.dirty || county.touched) && county.errors?.required\"\r\n                               class=\"text-danger\">County is required</small>\r\n                        <small *ngIf=\"county.invalid && (county.dirty || county.touched) && county.errors?.maxlength\"\r\n                               class=\"text-danger\">County must be less than 100 characters.</small>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>State:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <ng-select [items]=\"states\" [loading]=\"loadSave\" placeholder=\"Select State\" formControlName=\"state\"\r\n                                   bindLabel=\"text\" bindValue=\"value\"\r\n                                   [ngClass]=\"{'is-invalid': (state.invalid && (state.dirty || state.touched) && state.errors?.required) }\"></ng-select>\r\n                        <small *ngIf=\"state.invalid && (state.dirty || state.touched) && state.errors?.required\" class=\"text-danger\">Please select State</small>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"col-12 col-md-6 col-lg-4\">\r\n                      <label>Zip Code:<span class=\"text-danger\">*</span></label>\r\n                      <div class=\"form-group\">\r\n                        <input type=\"text\" class=\"form-control\" placeholder=\"Enter Zip Code\" formControlName=\"zipCode\"\r\n                               [ngClass]=\"{'is-invalid': (zipCode.invalid && (zipCode.dirty || zipCode.touched) && (zipCode.errors?.required || zipCode.errors?.maxlength)) }\">\r\n                        <small *ngIf=\"zipCode.invalid && (zipCode.dirty || zipCode.touched) && zipCode.errors?.required\"\r\n                               class=\"text-danger\">Zip Code is required</small>\r\n                        <small *ngIf=\"zipCode.invalid && (zipCode.dirty || zipCode.touched) && zipCode.errors?.maxlength\"\r\n                               class=\"text-danger\">Zip Code can not be greater than 5 characters.</small>\r\n                      </div>\r\n                    </div>\r\n\r\n\r\n\r\n                  </div>\r\n\r\n                </div>\r\n              </form>\r\n              <div class=\"col-12 p-0\">\r\n                <a href=\"javascript:void(0);\"  class=\"btn btn-primary form-btns\" *ngIf=\"addOrUpdatePermission\" (click)=\"addeditInsurance()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-danger form-btns\" (click)=\"Cancel()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </section>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageinsurance/insurancelist.component.html":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageinsurance/insurancelist.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"page\">\r\n  <!-- Breadcrumb-->\r\n  <div class=\"breadcrumb-holder\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row\">\r\n        <div class=\"col-lg-12 mt-3\">\r\n          <span class=\"dash\">Manage Insurance Company</span>\r\n          <ul class=\"breadcrumb\">\r\n            <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n            <li class=\"breadcrumb-item active\">Manage Insurance Company</li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>         <!-- Header Section-->\r\n  <div class=\"dashboard-header section-padding\">\r\n    <div class=\"container-fluid\">\r\n      <div class=\"row d-flex align-items-md-stretch\">\r\n        <div class=\"col-12\">\r\n          <div class=\"bg-white custom-shadow\">\r\n            <div class=\"col-md-12 border-bottom py-3\">\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-12 col-xl-12\">\r\n                  <div class=\"row mx-0 custom-top-padding\">\r\n                    <div class=\"col-12 col-md-12 col-lg-6 col-xl-4\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                        <input class=\"form-control\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name/Agent Email\" (keyup)='updateFilter($event)'>\r\n                        <input type=\"button\" class=\"btn btn-primary src-icon\" (click)=\"search()\" value=\"Search\">\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-12 col-md-6 col-lg-6 col-xl-2 mr-auto\">\r\n                      <div class=\"form-group mb-xl-0\">\r\n                       \r\n                        <input type=\"button\" class=\"btn btn-danger reset-icon\" value=\"Reset\" (click)=\"reset()\" />\r\n                      </div>\r\n                    </div>\r\n                    <div *ngIf='modulePermission!==null && modulePermission.roleModuleAddFlag' class=\"col-12 col-md-6 col-lg-6 col-xl-3 text-md-right float-right\"><a routerLink=\"/insurance/addinsurance\" class=\"btn btn-success form-btns\"><i class=\"fa fa-plus\"></i> Add Insurance</a></div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable  #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                 [rows]=\"pagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"pagedData.pager.totalItems\"\r\n                                 [offset]=\"pagedData.pager.currentPage\"\r\n                                 [limit]=\"pagedData.pager.pageSize\"\r\n                                 (page)='setPage($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n                    <ngx-datatable-column name=\"Name\" prop=\"Name\" [sortable]=\"true\"\r\n                                          *ngIf='modulePermission!==null && modulePermission.roleModuleReadFlag'>\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div><a [routerLink]=\"['/insurance/editinsurance',row.InsuranceId]\">{{row.Name}}</a></div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Name\" prop=\"Name\" [sortable]=\"true\" *ngIf='modulePermission!==null && !modulePermission.roleModuleReadFlag'></ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"Agent Email\" prop=\"AgentEmail\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div title=\"{{row.AgentEmail}}\">\r\n                          {{row.AgentEmail | truncate}}\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Agent Name\" prop=\"AgentName\" [sortable]=\"true\" headerClass=\"m-min-width115\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div title=\"{{row.AgentName}}\">\r\n                          {{row.AgentName | truncate}}\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"County\" prop=\"COUNTY\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"State\" prop=\"State\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"City\" prop=\"City\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Zip Code\" prop=\"ZipCode\" [sortable]=\"true\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Address\" prop=\"Address\" [sortable]=\"true\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div title=\"{{row.Address}}\">\r\n                          {{row.Address | truncate}}\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"IsActive\" [sortable]=\"true\" headerClass=\"text-center\"\r\n                                          *ngIf='modulePermission!==null &&  modulePermission.roleModuleUpdateFlag'>\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div class=\"icon-text-center\">\r\n                          <a *ngIf=\"row.IsActive == 0 && row.AssociateUser==null\" href=\"javascript:void(0);\" (click)=\"enable(row)\"><i title=\"Click to enable.\" class=\"fa fa-times text-danger icon_tick\"></i></a>\r\n                          <a *ngIf=\"row.IsActive == 1 && row.AssociateUser==null\" href=\"javascript:void(0);\" (click)=\"disable(row)\"><i title=\"Click to disable.\" class=\"fa fa-check text-success icon_tick\"></i></a>\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"IsActive\" [sortable]=\"true\" headerClass=\"text-center\"\r\n                                          *ngIf='!modulePermission!==null && !modulePermission.roleModuleUpdateFlag'>\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div class=\"icon-text-center\" *ngIf=\"row.IsActive == 0 && row.AssociateUser==null\">\r\n                          <span><i class=\"fa fa-times text-danger icon_tick\"></i></span>\r\n                        </div>\r\n                        <div class=\"icon-text-center\" *ngIf=\"row.IsActive == 1 && row.AssociateUser==null\">\r\n                          <span><i class=\"fa fa-check text-success icon_tick\"></i></span>\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"Delete\" [sortable]=\"false\" headerClass=\"text-center\"\r\n                                          *ngIf='modulePermission!==null && modulePermission.roleModuleDeleteFlag'>\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div class=\"icon-text-center\" *ngIf=\"row.AssociateUser==null\">\r\n                          <a href=\"javascript:void(0);\" (click)=\"DeleteInsurance(row)\" class=\"btn-delete mx-1\"><i title=\"Click to delete.\" class=\"fa fa-trash\"></i></a>\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\">\r\n                          {{rowCount}} total\r\n                        </div>\r\n                        <div>\r\n                          <div class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"pagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValue\"\r\n                                         [count]=\"pagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPage($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./src/app/views/manageinsurance/addeditinsurance.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/views/manageinsurance/addeditinsurance.component.ts ***!
  \*********************************************************************/
/*! exports provided: AddeditinsuranceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditinsuranceComponent", function() { return AddeditinsuranceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _insurance_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./insurance.service */ "./src/app/views/manageinsurance/insurance.service.ts");
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

//import { AddEditInsurance, AddeditinsuranceService } from './addeditinsurance.service';





var AddeditinsuranceComponent = /** @class */ (function () {
    function AddeditinsuranceComponent(fb, insuranceService, commonService, router, toaster, route) {
        var _this = this;
        this.fb = fb;
        this.insuranceService = insuranceService;
        this.commonService = commonService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.insuranceModel = new _insurance_service__WEBPACK_IMPORTED_MODULE_5__["AddEditInsurance"]();
        this.loadSave = false;
        this.commonService.getMasterItemsList("status").subscribe(function (result) {
            _this.lstStatus = _this.commonService.masters;
        });
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
    }
    AddeditinsuranceComponent.prototype.initForm = function () {
        this.addInsuranceForm = this.fb.group({
            insuranceId: [''],
            name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(500)]],
            agentName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(100)]],
            agentEmail: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].email, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(100)]],
            phone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            city: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(100)]],
            state: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            zipCode: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(5)]],
            county: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(100)]],
            address: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].maxLength(500)]],
            statusId: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
        });
    };
    Object.defineProperty(AddeditinsuranceComponent.prototype, "name", {
        get: function () { return this.addInsuranceForm.get('name'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditinsuranceComponent.prototype, "county", {
        get: function () { return this.addInsuranceForm.get('county'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditinsuranceComponent.prototype, "state", {
        get: function () { return this.addInsuranceForm.get('state'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditinsuranceComponent.prototype, "agentEmail", {
        get: function () { return this.addInsuranceForm.get('agentEmail'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditinsuranceComponent.prototype, "phone", {
        get: function () { return this.addInsuranceForm.get('phone'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditinsuranceComponent.prototype, "zipCode", {
        get: function () { return this.addInsuranceForm.get('zipCode'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditinsuranceComponent.prototype, "agentName", {
        get: function () { return this.addInsuranceForm.get('agentName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditinsuranceComponent.prototype, "city", {
        get: function () { return this.addInsuranceForm.get('city'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditinsuranceComponent.prototype, "address", {
        get: function () { return this.addInsuranceForm.get('address'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditinsuranceComponent.prototype, "statusId", {
        get: function () { return this.addInsuranceForm.get('statusId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddeditinsuranceComponent.prototype, "insuranceId", {
        get: function () { return this.addInsuranceForm.get('insuranceId'); },
        enumerable: true,
        configurable: true
    });
    AddeditinsuranceComponent.prototype.ngOnInit = function () {
        this.addOrUpdatePermission = false;
        var id = this.route.snapshot.paramMap.get('insuranceId');
        if (id) {
            this.loadSave = true;
            this.fillForm(id);
        }
        else {
            this.pageTitle = 'Add Insurance Company';
            this.addOrUpdatePermission = this.modulePermission.roleModuleAddFlag;
        }
        this.initForm();
        this.getState();
    };
    AddeditinsuranceComponent.prototype.fillForm = function (id) {
        var _this = this;
        this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
        this.insuranceService.getInsuranceDetail(id).subscribe(function (result) {
            if (result) {
                _this.loadSave = false;
                _this.pageTitle = 'Edit Insurance Company: ' + result.name;
                _this.addInsuranceForm.patchValue({
                    insuranceId: result.insuranceId,
                    name: result.name,
                    address: result.address,
                    city: result.city,
                    state: result.state,
                    zipCode: result.zipCode,
                    phone: result.phone,
                    agentEmail: result.agentEmail,
                    agentName: result.agentName,
                    county: result.county,
                    statusId: result.statusId.toLowerCase()
                });
                if (result.associateUser != null) {
                    _this.addInsuranceForm.controls.statusId.disable();
                    _this.status = result.statusId;
                    _this.associateUser = result.associateUser;
                }
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AddeditinsuranceComponent.prototype.getState = function () {
        var _this = this;
        this.insuranceService.getStateList().subscribe(function (result) {
            var data = result;
            _this.states = data;
        });
    };
    AddeditinsuranceComponent.prototype.addeditInsurance = function () {
        var _this = this;
        if (this.addInsuranceForm.valid) {
            this.loadSave = true;
            if (this.addInsuranceForm.value.insuranceId == undefined) {
                this.insuranceModel.insuranceId = null;
                this.insuranceModel.statusId = this.addInsuranceForm.value.statusId;
            }
            else {
                this.insuranceModel.insuranceId = this.addInsuranceForm.value.insuranceId;
                if (this.associateUser == null) {
                    this.insuranceModel.statusId = this.addInsuranceForm.value.statusId;
                }
                else {
                    this.insuranceModel.statusId = this.status;
                }
            }
            this.insuranceModel.Name = this.addInsuranceForm.value.name;
            this.insuranceModel.Address = this.addInsuranceForm.value.address;
            this.insuranceModel.City = this.addInsuranceForm.value.city;
            this.insuranceModel.State = this.addInsuranceForm.value.state;
            this.insuranceModel.ZipCode = this.addInsuranceForm.value.zipCode;
            this.insuranceModel.Phone = this.addInsuranceForm.value.phone;
            this.insuranceModel.AgentEmail = this.addInsuranceForm.value.agentEmail;
            this.insuranceModel.AgentName = this.addInsuranceForm.value.agentName;
            this.insuranceModel.County = this.addInsuranceForm.value.county;
            this.insuranceService.addeditInsurance(this.insuranceModel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.router.navigateByUrl("/insurance");
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
            this.commonService.validateAllFormFields(this.addInsuranceForm);
        }
    };
    AddeditinsuranceComponent.prototype.Cancel = function () {
        this.router.navigateByUrl("/insurance");
    };
    AddeditinsuranceComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _insurance_service__WEBPACK_IMPORTED_MODULE_5__["InsuranceService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] }
    ]; };
    AddeditinsuranceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditinsurance',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditinsurance.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageinsurance/addeditinsurance.component.html")).default
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _insurance_service__WEBPACK_IMPORTED_MODULE_5__["InsuranceService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"]])
    ], AddeditinsuranceComponent);
    return AddeditinsuranceComponent;
}());



/***/ }),

/***/ "./src/app/views/manageinsurance/insurance-routing.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/views/manageinsurance/insurance-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: InsuranceRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsuranceRoutingModule", function() { return InsuranceRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _insurancelist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./insurancelist.component */ "./src/app/views/manageinsurance/insurancelist.component.ts");
/* harmony import */ var _addeditinsurance_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addeditinsurance.component */ "./src/app/views/manageinsurance/addeditinsurance.component.ts");
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
    { path: '', component: _insurancelist_component__WEBPACK_IMPORTED_MODULE_2__["InsurancelistComponent"] },
    { path: 'addinsurance', component: _addeditinsurance_component__WEBPACK_IMPORTED_MODULE_3__["AddeditinsuranceComponent"] },
    { path: 'editinsurance/:insuranceId', component: _addeditinsurance_component__WEBPACK_IMPORTED_MODULE_3__["AddeditinsuranceComponent"] }
];
var InsuranceRoutingModule = /** @class */ (function () {
    function InsuranceRoutingModule() {
    }
    InsuranceRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], InsuranceRoutingModule);
    return InsuranceRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/manageinsurance/insurance.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/views/manageinsurance/insurance.module.ts ***!
  \***********************************************************/
/*! exports provided: insuranceModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insuranceModule", function() { return insuranceModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _insurancelist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./insurancelist.component */ "./src/app/views/manageinsurance/insurancelist.component.ts");
/* harmony import */ var _insurance_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./insurance-routing.module */ "./src/app/views/manageinsurance/insurance-routing.module.ts");
/* harmony import */ var _addeditinsurance_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./addeditinsurance.component */ "./src/app/views/manageinsurance/addeditinsurance.component.ts");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






var insuranceModule = /** @class */ (function () {
    function insuranceModule() {
    }
    insuranceModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_insurancelist_component__WEBPACK_IMPORTED_MODULE_2__["InsurancelistComponent"], _addeditinsurance_component__WEBPACK_IMPORTED_MODULE_4__["AddeditinsuranceComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _insurance_routing_module__WEBPACK_IMPORTED_MODULE_3__["InsuranceRoutingModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"]
            ]
        })
    ], insuranceModule);
    return insuranceModule;
}());



/***/ }),

/***/ "./src/app/views/manageinsurance/insurancelist.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/views/manageinsurance/insurancelist.component.ts ***!
  \******************************************************************/
/*! exports provided: InsurancelistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsurancelistComponent", function() { return InsurancelistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _insurance_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./insurance.service */ "./src/app/views/manageinsurance/insurance.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
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







var InsurancelistComponent = /** @class */ (function () {
    function InsurancelistComponent(insuranceService, commonService, router, toaster, dialogService, activeRoute) {
        var _this = this;
        this.insuranceService = insuranceService;
        this.commonService = commonService;
        this.router = router;
        this.toaster = toaster;
        this.dialogService = dialogService;
        this.activeRoute = activeRoute;
        this.loading = false;
        this.sortDir = 'asc';
        this.sortColumn = 'CreatedOn';
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
    InsurancelistComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.refresh();
    };
    InsurancelistComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    InsurancelistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    InsurancelistComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.loading = true;
        this.insuranceService.getInsuranceList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.insuranceService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    InsurancelistComponent.prototype.search = function () {
        var _this = this;
        this.loading = true;
        this.insuranceService.getInsuranceList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.insuranceService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    InsurancelistComponent.prototype.reset = function () {
        var _this = this;
        this.table.sorts = [];
        this.loading = true;
        this.listFilter = '';
        this.sortDir = 'asc';
        this.sortColumn = 'CreatedOn';
        this.pageSizeValue = 10;
        this.insuranceService.getInsuranceList(this.listFilter, this.sortColumn, this.sortDir, 0, 10, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.insuranceService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    InsurancelistComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.loading = true;
        this.insuranceService.getInsuranceList(this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.insuranceService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    InsurancelistComponent.prototype.onSort = function ($event) {
        var _this = this;
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loading = true;
        this.insuranceService.getInsuranceList(this.listFilter, this.sortColumn, this.sortDir, $event.page - 1, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.insuranceService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    InsurancelistComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.insuranceService.getInsuranceList(this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.insuranceService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    InsurancelistComponent.prototype.DeleteInsurance = function (row) {
        var _this = this;
        var message = row.Name + " is associated with User. So not able to delete " + row.Name + ".";
        if (row.AssociateUser == true) {
            this.toaster.error(message);
            this.loading = false;
            return false;
        }
        message = "Are you sure you want to delete Insurance Company \"" + row.Name + "\"?";
        this.dialogService.confirm('Delete Insurance Company', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.insuranceService.deleteInsurance(row.InsuranceId).subscribe(function (result) {
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
    InsurancelistComponent.prototype.disable = function (insurance) {
        var _this = this;
        var message = insurance.Name + " is associated with User. So not able to Disabled " + insurance.Name + ".";
        if (insurance.AssociateUser == true) {
            this.toaster.error(message);
            this.loading = false;
            return false;
        }
        message = "Are you sure you want to disable Insurance Company \"" + insurance.Name + "\"?";
        this.dialogService.confirm('Disable Insurance Company', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.insuranceService.changeStatus(insurance.InsuranceId).subscribe(function (r) {
                    _this.refresh();
                    _this.toaster.success("\"" + insurance.Name + "\" has been disabled  successfully");
                }, function (error) {
                });
            }
        });
    };
    InsurancelistComponent.prototype.enable = function (insurance) {
        var _this = this;
        var message = "Are you sure you want to enable Insurance Company  \"" + insurance.Name + "\"?";
        this.dialogService.confirm('Enable Insurance Company', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.insuranceService.changeStatus(insurance.InsuranceId).subscribe(function (response) {
                    _this.refresh();
                    _this.toaster.success("\"" + insurance.Name + "\" has been enabled  successfully");
                }, function (error) {
                });
            }
        });
    };
    InsurancelistComponent.ctorParameters = function () { return [
        { type: _insurance_service__WEBPACK_IMPORTED_MODULE_1__["InsuranceService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["DatatableComponent"])
    ], InsurancelistComponent.prototype, "table", void 0);
    InsurancelistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-insurancelist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./insurancelist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/manageinsurance/insurancelist.component.html")).default
        }),
        __metadata("design:paramtypes", [_insurance_service__WEBPACK_IMPORTED_MODULE_1__["InsuranceService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_5__["ConfirmationDialogService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], InsurancelistComponent);
    return InsurancelistComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-manageinsurance-insurance-module.js.map