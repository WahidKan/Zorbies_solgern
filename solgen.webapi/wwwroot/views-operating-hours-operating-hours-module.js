(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-operating-hours-operating-hours-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/operating-hours/add-edit-operating-hour-modal/add-edit-operating-hour-modal.component.html":
/*!********************************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/operating-hours/add-edit-operating-hour-modal/add-edit-operating-hour-modal.component.html ***!
  \********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n<div bsModal #modal=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\"\naria-hidden=\"true\">\n\n  <div class=\"modal-dialog modal-xl modal-info \" [ngClass]=\"{'disabled':loadSave}\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\" *ngIf=\"isAddForm\">\n        <h4 class=\"modal-title\">Add Operating Hours</h4>\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-header\" *ngIf=\"!isAddForm\">\n        <h4 class=\"modal-title\">Edit Operating Hours</h4>\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n\n      <div class=\"modal-body\" style=\" margin-bottom:10px; height:auto;overflow:inherit;\">\n        <form  id=\"myform\" [formGroup]=\"addOperatingHoursForm\" *ngIf=\"addOperatingHoursForm\" autocomplete=\"off\">\n         <div class=\"row\">\n            <div class=\"col-12 col-md-4 col-lg-4\">\n              <label>Name:<span class=\"text-danger\">*</span></label>\n              <div class=\"form-group\">\n                <input type=\"text\" class=\"form-control\" placeholder=\"Enter Form Name\" maxlength=\"50\" formControlName=\"name\" [ngClass]=\"{'is-invalid': (name?.invalid && (name.dirty || name.touched) && (name.errors?.required || name.errors?.maxlength)) }\">\n                <small *ngIf=\"name?.invalid && (name.dirty || name.touched) && name.errors?.required\" class=\"text-danger\">Name is required</small>\n              </div>\n            </div>\n\n            <div class=\"col-12 col-md-4 col-lg-4\">\n             <label>Description:<span class=\"text-danger\">*</span></label>\n             <div class=\"form-group\">\n                <input type=\"text\" class=\"form-control\" placeholder=\"Enter Description\" maxlength=\"50\" formControlName=\"description\" [ngClass]=\"{'is-invalid': (description.invalid && (description.dirty || description.touched) && (description.errors?.required || description.errors?.maxlength)) }\">\n                <small *ngIf=\"description.invalid && (description.dirty || description.touched) && description.errors?.required\" class=\"text-danger\">Description is required</small>\n              </div>\n            </div>\n\n            <div class=\"col-12 col-md-4 col-lg-4\">\n             <label>Select Time Zone:<span class=\"text-danger\">*</span></label>\n             <div class=\"form-group\">\n              <ng-select [items]=\"timezoneList\"\n                           formControlName=\"timeZone\"\n                           placeholder=\"Select Time Zone\" bindValue=\"value\"\n                           bindLabel=\"text\" (change)=\"handleTimeZoneChange($event)\">\n              </ng-select>\n              <small *ngIf=\"timeZone.invalid && (timeZone.dirty || timeZone.touched) && timeZone.errors?.required\" class=\"text-danger\">Time Zone is required</small>\n            </div>\n          </div>\n         </div>\n          <h3 *ngIf=\"isAddForm\" class=\"form-heading ng-star-inserted\"><span>Time Slots:</span></h3>\n          <!-- <h3 *ngIf=\"!isAddForm\" class=\"form-heading ng-star-inserted\"><span>Edit Form:</span></h3> -->\n          <div class=\"row\">\n          <div class=\"panel-content px-3 pagination2 table-responsive no-padding\" >\n          <div class=\"table-responsive\">\n\n        <!--Table-->\n        <table class=\"table\">\n              <thead>\n                <tr>\n                    <th  *ngFor=\"let column of timeSlotColumns\">\n                        {{column.name}}\n                    </th>\n                </tr>\n              </thead>\n              <tbody formArrayName=\"timeSlots\" *ngIf=\"this.addOperatingHoursForm.get('timeSlots')\">\n                <tr  *ngFor=\"let row of TimeSlots; let i = index\" [formGroupName]=\"i\" >\n                  <td>\n                    <!-- <input type=\"text\" formControlName=\"dayOfWeek\"> -->\n                      <div class=\"form-group\">\n                        <ng-select [items]=\"dayOfWeek\"\n                           formControlName=\"dayOfWeek\"\n                           placeholder=\"Select Day\" bindValue=\"value\"\n                           bindLabel=\"text\">\n                        </ng-select>\n                         <!-- <small *ngIf=\"timeZone.invalid && (timeZone.dirty || timeZone.touched) && timeZone.errors?.required\" class=\"text-danger\">Time Zone is required</small> -->\n                      </div>\n                  </td>\n                  <td>\n                    <!-- <input type=\"text\" formControlName=\"startTime\"> -->\n                     <input type=\"time\" id=\"inputMDEx1\" class=\"form-control\" formControlName=\"startTime\">\n                  </td>\n                  <td>\n                    <!-- <input type=\"text\" formControlName=\"endTime\"> -->\n                     <input type=\"time\" id=\"inputMDEx1\" class=\"form-control\" formControlName=\"endTime\">\n\n                  </td>\n                   <td>\n                      <div class=\"form-group\">\n                        <ng-select [items]=\"workTypes\"\n                           formControlName=\"workType\"\n                           placeholder=\"Select WorkType\" bindValue=\"value\"\n                           bindLabel=\"text\">\n                        </ng-select>\n                      </div>\n                    <!-- <input type=\"text\" formControlName=\"workType\"> -->\n                  </td>\n                   <td>\n                    <a class=\"btn btn-danger form-btns\"\n                      (click)=\"onDeleteTimeslot(row.get('id').value, i)\"\n                      tooltip=\"Delete\"\n                      href=\"javascript:void(0);\">\n                      <span><i class=\"fa fa-trash\"></i> </span>\n                    </a>\n                  </td>\n\n                </tr>\n              </tbody>\n            </table>\n          </div>\n          <a\n            (click)=\"onAddTimeslot()\"\n            id=\"addTimeslotBtn\"\n            href=\"javascript:void(0);\"  class=\"btn btn-success form-btns mr-1\" tooltip=\"Add TimeSlot\">\n            <i class=\"fa fa-plus\"></i>\n          </a>\n      </div>\n    </div>\n       </form>\n     </div>\n      <div class=\"modal-footer\">\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"saveNewForm()\"><i class=\"fa fa-save text-white pr-2\"></i>Submit</button>\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\n      </div>\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\n    </div>\n  </div>\n</div>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/operating-hours/operating-hours-list/operating-hours-list.component.html":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/operating-hours/operating-hours-list/operating-hours-list.component.html ***!
  \**************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Breadcrumb-->\n<div class=\"header float-left w-100 mb-2\">\n  <h2 class=\"float-left pr-2\"><strong>Manage Operating Hours</strong></h2>\n  <div class=\"breadcrumb-wrapper\">\n    <ol class=\"breadcrumb\">\n      <li>\n        <a routerLink=\"/dashboard\">Dashboard</a>\n      </li>\n      <li class=\"active\">Manage Operating Hours</li>\n    </ol>\n  </div>\n</div>\n\n<div class=\"clearfix\"></div>\n<div class=\"row\">\n  <div class=\"col-lg-12 portlets\">\n    <div class=\"panel\">\n      <div class=\"panel-header border-bottom\">\n        <div class=\"row mt-2\">\n          <div class=\"col-md-6 col-xl-6\">\n            <div class=\"row searchfield mr-1 w-100\">\n              <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\n                <input\n                  class=\"form-control input-sm\"\n                  [(ngModel)]=\"listFilter\"\n                  (keyup)=\"updateFilter($event)\"\n                  type=\"text\"\n                  placeholder=\"Search By Name\"\n                />\n              </div>\n              <div class=\"col-lg-8 float-left\">\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" tooltip=\"Search\"\n                  ><span><i class=\"fa fa-search\" (click)=\"search()\"></i> </span\n                ></a>\n                <a class=\"btn btn-danger form-btns mr-2\" (click)=\"reset()\" href=\"javascript:void(0);\" tooltip=\"Reset\"\n                  ><span><i class=\"fa fa-refresh\"></i> </span\n                ></a>\n              </div>\n            </div>\n          </div>\n          <div class=\"col-md-12 col-xl-6\">\n            <div class=\"dt-buttons\">\n              <a href=\"javascript:void(0);\" (click)=\"showpopup()\" class=\"btn btn-success form-btns mr-1\" tooltip=\"Add Operating Hours\"\n                ><i class=\"fa fa-plus\"></i>\n              </a>\n              <a\n                class=\"btn btn-danger form-btns\"\n                (click)=\"onDeleteMultipleOperatingHours()\"\n                href=\"javascript:void(0);\"\n                tooltip=\"Delete\"\n                ><span><i class=\"fa fa-trash\"></i></span\n              ></a>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\n          <ngx-datatable\n            #table\n            class=\"bootstrap table table-hover table-dynamic\"\n            [rows]=\"pagedData.data\"\n            [columnMode]=\"'force'\"\n            [scrollbarH]=\"true\"\n            [rowHeight]=\"'40'\"\n            [headerHeight]=\"40\"\n            [footerHeight]=\"40\"\n            [externalPaging]=\"true\"\n            [externalSorting]=\"true\"\n            [loadingIndicator]=\"loadSave\"\n            [count]=\"pagedData.pager.totalItems\"\n            [offset]=\"pagedData.pager.currentPage\"\n            [limit]=\"pagedData.pager.pageSize\"\n            (page)=\"setPage($event)\"\n            (sort)=\"onSort($event)\"\n            [selectionType]=\"SelectionType.checkbox\"\n            [selectAllRowsOnPage]=\"false\"\n            [selected]=\"selected\"\n            (select)=\"onSelect($event)\"\n          >\n            <ngx-datatable-column\n              [width]=\"42\"\n              [sortable]=\"false\"\n              [canAutoResize]=\"false\"\n              [draggable]=\"false\"\n              [resizeable]=\"false\"\n              [headerCheckboxable]=\"true\"\n              [checkboxable]=\"true\"\n            >\n            </ngx-datatable-column>\n            <ngx-datatable-column name=\"Name\" prop=\"name\" [sortable]=\"true\"></ngx-datatable-column>\n            <ngx-datatable-column name=\"Last Modified Date\" prop=\"lastModifiedDate\" [sortable]=\"true\">\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                {{ getTransformedDate(row.lastModifiedDate) }}\n              </ng-template>\n            </ngx-datatable-column>\n            <ngx-datatable-column name=\"Last Modified By\" prop=\"lastModifiedBy\" [sortable]=\"true\"></ngx-datatable-column>\n            <ngx-datatable-column [width]=\"80\" name=\"Action\" [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                <div class=\"text-center\">\n                  <a class=\"\" [routerLink]=\"['/operating-hours/view', row.id]\" title=\"View Operating Hours\"\n                    ><i class=\"fa fa-eye pr-2\"></i\n                  ></a>\n                  <a (click)=\"showpopup(row.id)\" class=\"btn-edit\" href=\"javascript:void(0);\"\n                    ><i title=\"Add/Edit Form Fields\" class=\"fa fa-pencil text-success pr-2\"></i\n                  ></a>\n\n                  <a (click)=\"deleteForm(row)\" class=\"btn-edit\" href=\"javascript:void(0);\"\n                    ><i class=\"fa fa-trash text-danger pr-2\" title=\"Delete Form\"></i\n                  ></a>\n                </div>\n              </ng-template>\n            </ngx-datatable-column>\n            <ngx-datatable-footer>\n              <ng-template\n                ngx-datatable-footer-template\n                let-rowCount=\"rowCount\"\n                let-pageSize=\"pageSize\"\n                let-selectedCount=\"selectedCount\"\n                let-currentPage=\"currentPage\"\n                let-offset=\"offset\"\n                let-isVisible=\"isVisible\"\n              >\n                <div>\n                  <div style=\"color: black; margin-right: 10px\" class=\"page-size-record\">\n                    <span style=\"text-align: right; width: 80px; vertical-align: middle\">\n                      <ng-select\n                        [searchable]=\"false\"\n                        [items]=\"lstPageSize\"\n                        appendTo=\"body\"\n                        [(ngModel)]=\"operatingHoursParams.pageSize\"\n                        dropzone=\"fixed\"\n                        [clearable]=\"false\"\n                        (change)=\"onChange($event)\"\n                        draggable=\"false\"\n                        [closeOnSelect]=\"true\"\n                        bindLabel=\"text\"\n                        bindValue=\"text\"\n                      ></ng-select>\n                    </span>\n                  </div>\n                </div>\n                <div class=\"page-count\" *ngIf=\"rowCount > 0\">\n                  {{ commonService.PageString(pagedData.pager.currentPage + 1, operatingHoursParams.pageSize, rowCount) }}\n                </div>\n                <datatable-pager\n                  [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\n                  [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\n                  [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\n                  [pagerNextIcon]=\"'fa fa-angle-double-right'\"\n                  [page]=\"curPage\"\n                  [size]=\"operatingHoursParams.pageSize\"\n                  [count]=\"pagedData.pager.totalItems\"\n                  [hidden]=\"!(rowCount / pageSize > 1)\"\n                  (change)=\"setPage($event)\"\n                >\n                </datatable-pager>\n              </ng-template>\n            </ngx-datatable-footer>\n          </ngx-datatable>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<app-loader [size]=\"60\" [color]=\"'white'\" *ngIf=\"loading\" class=\"loader-popup\"></app-loader>\n\n<app-add-edit-operating-hour-modal #addEditModal></app-add-edit-operating-hour-modal>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/operating-hours/operating-hours-view/operating-hours-view.component.html":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/operating-hours/operating-hours-view/operating-hours-view.component.html ***!
  \**************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\n    <h2 class=\"float-left pr-2\"><strong>Manage Operating Hours</strong></h2>\n    <div class=\"breadcrumb-wrapper\">\n        <ol class=\"breadcrumb\">\n            <li><a routerLink=\"/dashboard\">Dashboard</a></li>\n            <li><a routerLink=\"/operating-hours\">Manage Operating Hours</a></li>\n        </ol>\n    </div>\n</div>\n<div class=\"clearfix\"></div>\n\n<div *ngIf=\"operatingHours\" class=\"card mb-3 mb-4 border\">\n    <span class=\"text-capitalize p-3 font-weight-bold border-bottom heading-above-subhead\">\n        <i class=\"fa fa-clock-o fa-2x float-left p-1 mr-2\"></i>\n        <span class=\"float-left\"><span>Operating Hours</span> {{operatingHours.name}} -\n            {{timeZoneName}}</span>\n        <span class=\"cntnt-right-btn mr15 btn-iconres\">\n            <a href=\"javascript:;\" [routerLink]=\"\" (click)=\"showpopup(id)\" class=\"btn btn-success text-white mr-2\">\n                <i class=\"fa fa-pencil mr-1\"></i> Edit\n            </a>\n            <a href=\"javascript:;\" class=\"btn btn-dark text-white\" (click)=\"onBack()\">\n                <i class=\"fa fa-arrow-left mr-1\"></i> Back\n            </a>\n        </span>\n    </span>\n</div>\n<div class=\"clearfix\"></div>\n\n<div *ngIf=\"operatingHours\" class=\"card mb-3 mb-4 border\">\n    <div class=\"row\">\n        <div class=\"col-lg-12\">\n            <div class=\"panel-content w-100 bg-white scroll-in-content\">\n                <div class=\"row\">\n                    <div class=\"col-sm-12\">\n                        <h3 class=\"form-heading mt-0\"><span>Details</span></h3>\n                    </div>\n                </div>\n            </div>\n            <div id=\"accordion\" class=\"col-lg-12\" [ngClass]=\"{'disabled':loadSave}\">\n                <div class=\"panel active\">\n                    <div class=\"panel-heading\">\n                        <h4 class=\"panel-title\">\n                            <a href=\"#campaignManagers\" class=\"accordion-toggle\" data-toggle=\"collapse\"\n                                data-parent=\"#accordion\" aria-expanded=\"true\">\n                                <span>Information</span>\n                            </a>\n                        </h4>\n                    </div>\n                    <div id=\"campaignManagers\" class=\"panel-collapse collapse active show\" style=\"\">\n                        <div class=\"panel-body row px-3\">\n                            <div class=\"col-12 col-sm-6\">\n                                <div class=\"input-group border-bottom\">\n                                    <div class=\"col-md-3 col-6 px-0\">\n                                        <span class=\"py-2 d-block\"><strong>Name:</strong></span>\n                                    </div>\n                                    <div class=\"col-md-9 col-6 px-0\">\n                                        <span class=\"py-2 d-block\">{{operatingHours.name}}</span>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"col-12 col-sm-6\">\n                                <div class=\"input-group border-bottom\">\n                                    <div class=\"col-md-3 col-6 px-0\">\n                                        <span class=\"py-2 d-block\"><strong>Description:</strong></span>\n                                    </div>\n                                    <div class=\"col-md-9 col-6 px-0\">\n                                        <span class=\"py-2 d-block\">{{operatingHours.description}}</span>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"col-12 col-sm-6\">\n                                <div class=\"input-group border-bottom\">\n                                    <div class=\"col-md-3 col-6 px-0\">\n                                        <span class=\"py-2 d-block\"><strong>Time Zone:</strong></span>\n                                    </div>\n                                    <div class=\"col-md-9 col-6 px-0\">\n                                        <span class=\"py-2 d-block\">{{timeZoneName}}</span>\n                                    </div>\n                                </div>\n                            </div>\n\n                        </div>\n                    </div>\n                </div>\n                <div class=\"panel active\">\n                    <div class=\"panel-heading\">\n                        <h4 class=\"panel-title\">\n                            <a href=\"#campaignManagers1\" class=\"accordion-toggle\" data-toggle=\"collapse\"\n                                data-parent=\"#accordion\" aria-expanded=\"true\">\n                                <span>Time Slots ({{\n                                    (operatingHours && operatingHours.timeSlots) ?\n                                    operatingHours.timeSlots.length : 0}})</span>\n                            </a>\n                        </h4>\n                    </div>\n                    <div id=\"campaignManagers1\" class=\"panel-collapse collapse active show\" style=\"\">\n                        <div class=\"panel-body row px-3\">\n                            <div class=\"table-responsive ngxtbl\" *ngIf=\"operatingHours.timeSlots\">\n                                <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\n                                    [rows]=\"operatingHours.timeSlots\" [scrollbarH]=\"true\" [rowHeight]=\"'40'\"\n                                    [columnMode]=\"'force'\" [headerHeight]=\"40\"\n                                    >\n\n                                    <ngx-datatable-column name=\"Day Of Week\" prop=\"dayOfWeek\" [sortable]=\"true\">\n                                    </ngx-datatable-column>\n                                    <ngx-datatable-column name=\"Start Time\" prop=\"startTime\" [sortable]=\"true\">\n                                    </ngx-datatable-column>\n                                    <ngx-datatable-column name=\"End Time\" prop=\"endTime\" [sortable]=\"true\">\n                                    </ngx-datatable-column>\n                                    <ngx-datatable-column name=\"Type\" prop=\"workType\" [sortable]=\"true\">\n                                    </ngx-datatable-column>\n                                    <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\n                                        <ng-template let-row=\"row\" ngx-datatable-cell-template>\n                                            <div class=\"text-center\">\n                                                <a href=\"javascript:void(0);\" (click)=\"deleteTimeSlot(row.id)\"><i\n                                                        title=\"Click to delete.\"\n                                                        class=\"fa fa-trash text-danger\"></i></a>\n                                            </div>\n\n                                        </ng-template>\n                                    </ngx-datatable-column>\n                                </ngx-datatable>\n\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"panel active\">\n                    <div class=\"panel-heading\">\n                        <h4 class=\"panel-title\">\n                            <a href=\"#campaignManagers2\" class=\"accordion-toggle\" data-toggle=\"collapse\"\n                                data-parent=\"#accordion\" aria-expanded=\"true\">\n                                <span>System Information</span>\n                            </a>\n                        </h4>\n                    </div>\n                    <div id=\"campaignManagers2\" class=\"panel-collapse collapse active show\" style=\"\">\n                        <div class=\"panel-body row px-3\">\n                            <div class=\"col-12 col-sm-6\">\n                                <div class=\"input-group border-bottom\">\n                                    <div class=\"col-md-3 col-6 px-0\">\n                                        <span class=\"py-2 d-block\"><strong>Created By:</strong></span>\n                                    </div>\n                                    <div class=\"col-md-9 col-6 px-0\">\n                                        <span\n                                            class=\"py-2 d-block\"> <a href=\"javascript:void(0);\" [routerLink]=\"['/user/edituser/' + operatingHours.createdById]\"><strong>{{operatingHours.createdBy}}</strong></a>,{{operatingHours.createdDate}}\n                                          </span>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"col-12 col-sm-6\">\n                                <div class=\"input-group border-bottom\">\n                                    <div class=\"col-md-3 col-6 px-0\">\n                                        <span class=\"py-2 d-block\"><strong>Modified By:</strong></span>\n                                    </div>\n                                    <div class=\"col-md-9 col-6 px-0\">\n                                       <span\n                                            class=\"py-2 d-block\"> <a href=\"javascript:void(0);\" [routerLink]=\"['/user/edituser/' + operatingHours.lastModifiedById]\"><strong>{{operatingHours.lastModifiedBy}}</strong></a>,{{operatingHours.lastModifiedDate}}\n                                          </span>\n                                        <!-- <span\n                                            class=\"py-2 d-block\"><strong>{{operatingHours.lastModifiedBy}}</strong>,{{operatingHours.lastModifiedDate}}</span> -->\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class=\"clearfix\"></div>\n<app-add-edit-operating-hour-modal #addEditModal ></app-add-edit-operating-hour-modal>\n\n");

/***/ }),

/***/ "./src/app/views/operating-hours/add-edit-operating-hour-modal/add-edit-operating-hour-modal.component.scss":
/*!******************************************************************************************************************!*\
  !*** ./src/app/views/operating-hours/add-edit-operating-hour-modal/add-edit-operating-hour-modal.component.scss ***!
  \******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL29wZXJhdGluZy1ob3Vycy9hZGQtZWRpdC1vcGVyYXRpbmctaG91ci1tb2RhbC9hZGQtZWRpdC1vcGVyYXRpbmctaG91ci1tb2RhbC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/operating-hours/add-edit-operating-hour-modal/add-edit-operating-hour-modal.component.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/app/views/operating-hours/add-edit-operating-hour-modal/add-edit-operating-hour-modal.component.ts ***!
  \****************************************************************************************************************/
/*! exports provided: AddEditOperatingHourModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddEditOperatingHourModalComponent", function() { return AddEditOperatingHourModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _services_operating_hours_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/operating-hours.service */ "./src/app/views/operating-hours/services/operating-hours.service.ts");
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







var AddEditOperatingHourModalComponent = /** @class */ (function () {
    function AddEditOperatingHourModalComponent(commonService, fb, toaster, dialogService, operatingHoursService) {
        this.commonService = commonService;
        this.fb = fb;
        this.toaster = toaster;
        this.dialogService = dialogService;
        this.operatingHoursService = operatingHoursService;
        this.isAddForm = false;
        this.loadSave = false;
        this.loading = false;
        this.onAdd = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.operatingHoursParams = {
            filter: '',
            sortColumn: '',
            sortDir: 'desc',
            page: 0,
            pageSize: 10
        };
        this.pagedData = {
            pager: {},
            data: []
        };
        this.timeSlots = [
            { id: null, day: 'Monday', startTime: null, endTime: null, type: 'Normal' },
            { id: null, day: 'Tuesday', startTime: null, endTime: null, type: 'Normal' },
            { id: null, day: 'Wednesday', startTime: null, endTime: null, type: 'Normal' },
            { id: null, day: 'Thursday', startTime: null, endTime: null, type: 'Normal' },
            { id: null, day: 'Friday', startTime: null, endTime: null, type: 'Normal' },
            { id: null, day: 'Saturday', startTime: null, endTime: null, type: 'Normal' },
            { id: null, day: 'Sunday', startTime: null, endTime: null, type: 'Normal' },
        ];
        this.workTypes = [
            { text: 'Normal', value: 'Normal' },
            { text: 'Extended', value: 'Extended' },
        ];
        this.timeSlotColumns = [
            { name: 'Day Of Week' },
            { name: 'Start Time' },
            { name: 'End Time' },
            { name: 'Type' },
            { name: 'Delete' },
        ];
        this.types = [
            { id: 'Normal', value: 'Normal' },
            { id: 'Extended', value: 'Extended' }
        ];
        this.dayOfWeek = [
            { text: 'Monday', value: 'Monday' },
            { text: 'Tuesday', value: 'Tuesday' },
            { text: 'Wednesday', value: 'Wednesday' },
            { text: 'Thursday', value: 'Thursday' },
            { text: 'Friday', value: 'Friday' },
            { text: 'Saturday', value: 'Saturday' },
            { text: 'Sunday', value: 'Sunday' },
        ];
    }
    AddEditOperatingHourModalComponent.prototype.ngOnInit = function () {
        this.getTimeZones();
    };
    AddEditOperatingHourModalComponent.prototype.onEntryAdded = function () {
    };
    AddEditOperatingHourModalComponent.prototype.onEntryUpdated = function () {
    };
    Object.defineProperty(AddEditOperatingHourModalComponent.prototype, "name", {
        get: function () { return this.addOperatingHoursForm.get('name'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditOperatingHourModalComponent.prototype, "description", {
        get: function () { return this.addOperatingHoursForm.get('description'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditOperatingHourModalComponent.prototype, "timeZone", {
        get: function () { return this.addOperatingHoursForm.get('timeZone'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddEditOperatingHourModalComponent.prototype, "TimeSlots", {
        get: function () {
            return this.addOperatingHoursForm.get('timeSlots').controls;
        },
        enumerable: true,
        configurable: true
    });
    AddEditOperatingHourModalComponent.prototype.showpopup = function (params) {
        this.isAddForm = true;
        if (params) {
            this.editOperatingHour(params);
        }
        else {
            this.createFormForSlots();
        }
    };
    AddEditOperatingHourModalComponent.prototype.getTimeZones = function () {
        var _this = this;
        this.commonService.getTimeZoneList().subscribe(function (res) {
            _this.timezoneList = JSON.parse(res);
        });
    };
    // refresh() {
    //   this.loading = true;
    //   this.operatingHoursService.getOperatingHoursList(this.operatingHoursParams)
    //     .subscribe(response => {
    //       this.pagedData = {
    //         data: response.data,
    //         pager: response.pager
    //       }
    //       this.loading = false;
    //     }, error => {
    //       this.loading = false;
    //     });
    // }
    AddEditOperatingHourModalComponent.prototype.close = function () {
        this.addOperatingHoursModal.hide();
    };
    AddEditOperatingHourModalComponent.prototype.onDeleteTimeslot = function (id, index) {
        var _this = this;
        if (id) {
            this.operatingHoursService.deleteOperatingHoursTimeSlot(id).subscribe(function (res) {
                var array = _this.addOperatingHoursForm.get('timeSlots');
                array.removeAt(index);
            });
        }
        else {
            var array = this.addOperatingHoursForm.get('timeSlots');
            array.removeAt(index);
        }
    };
    AddEditOperatingHourModalComponent.prototype.onAddTimeslot = function () {
        this.addOperatingHoursForm.get('timeSlots').push(this.fb.group({
            id: [null],
            dayOfWeek: [null],
            startTime: [null],
            endTime: [null],
            workType: [null],
            statusId: ['1001'],
        }));
    };
    AddEditOperatingHourModalComponent.prototype.handleTimeZoneChange = function () {
    };
    AddEditOperatingHourModalComponent.prototype.editOperatingHour = function (id) {
        var _this = this;
        this.operatingHoursService.getOperatingHoursById(id).subscribe(function (res) {
            res.timeSlots = res.timeSlots || [];
            _this.editFormForSlots(res);
        });
        this.isEdit = true;
        this.addOperatingHoursModal.show();
    };
    AddEditOperatingHourModalComponent.prototype.editFormForSlots = function (param) {
        var _this = this;
        this.addOperatingHoursForm = this.fb.group({
            name: [param.name, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            description: [param.description, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            timeZone: [param.timeZone, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            id: [param.id],
            statusId: [param.statusId],
            timeSlots: this.fb.array([])
        });
        var arry = this.addOperatingHoursForm.get('timeSlots');
        while (arry.controls.length > 0) {
            arry.removeAt(0);
        }
        param.timeSlots.forEach(function (s) {
            _this.addOperatingHoursForm.get('timeSlots').push(_this.fb.group({
                id: [s.id],
                dayOfWeek: [s.dayOfWeek],
                startTime: [s.startTime],
                endTime: [s.endTime],
                workType: [s.workType],
                statusId: [s.statusId],
            }));
        });
    };
    AddEditOperatingHourModalComponent.prototype.createFormForSlots = function () {
        var _this = this;
        this.addOperatingHoursForm = this.fb.group({
            name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            description: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            timeZone: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required],
            id: [null],
            statusId: ['1001'],
            timeSlots: this.fb.array([])
        });
        this.timeSlots.forEach(function (s) {
            _this.addOperatingHoursForm.get('timeSlots').push(_this.fb.group({
                id: [s.id],
                dayOfWeek: [s.day],
                startTime: [s.startTime],
                endTime: [s.endTime],
                workType: [s.type],
                statusId: ['1001'],
            }));
        });
        this.addOperatingHoursModal.show();
        console.log(this.addOperatingHoursForm);
    };
    AddEditOperatingHourModalComponent.prototype.saveNewForm = function () {
        var _this = this;
        if (this.addOperatingHoursForm.valid) {
            console.log(this.addOperatingHoursForm.value);
            this.operatingHoursService.addOperatingHours(this.addOperatingHoursForm.value).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.addOperatingHoursModal.hide();
                    _this.onAdd.emit();
                }
                else if (result.statusCode == 300) {
                    _this.toaster.success(result.responseMessage);
                    _this.addOperatingHoursModal.hide();
                    _this.onAdd.emit();
                }
                else if (result.statusCode == 500 && result.id == -1) {
                    _this.toaster.error("Already Exists with same form Name");
                }
                else if (result.statusCode == 500 && result.id == -2) {
                    _this.toaster.error("Can not be same name as system predefine");
                }
                else {
                    _this.onAdd.emit();
                    _this.toaster.error(result.responseMessage);
                }
            });
        }
        else {
            this.commonService.validateAllFormFields(this.addOperatingHoursForm);
        }
    };
    AddEditOperatingHourModalComponent.ctorParameters = function () { return [
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"] },
        { type: _services_operating_hours_service__WEBPACK_IMPORTED_MODULE_6__["OperatingHoursService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('modal', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_5__["ModalDirective"])
    ], AddEditOperatingHourModalComponent.prototype, "addOperatingHoursModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], AddEditOperatingHourModalComponent.prototype, "onAdd", void 0);
    AddEditOperatingHourModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-add-edit-operating-hour-modal',
            template: __importDefault(__webpack_require__(/*! raw-loader!./add-edit-operating-hour-modal.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/operating-hours/add-edit-operating-hour-modal/add-edit-operating-hour-modal.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./add-edit-operating-hour-modal.component.scss */ "./src/app/views/operating-hours/add-edit-operating-hour-modal/add-edit-operating-hour-modal.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_4__["ConfirmationDialogService"],
            _services_operating_hours_service__WEBPACK_IMPORTED_MODULE_6__["OperatingHoursService"]])
    ], AddEditOperatingHourModalComponent);
    return AddEditOperatingHourModalComponent;
}());



/***/ }),

/***/ "./src/app/views/operating-hours/operating-hours-list/operating-hours-list.component.scss":
/*!************************************************************************************************!*\
  !*** ./src/app/views/operating-hours/operating-hours-list/operating-hours-list.component.scss ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#addTimeslotBtn {\n  margin-left: 90%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdmlld3Mvb3BlcmF0aW5nLWhvdXJzL29wZXJhdGluZy1ob3Vycy1saXN0L0Q6XFxQcmluY2UgU2luZ2hcXHdvcmtzcGFjZVxcU29sZ2VuT25lXFxMYWhvcmUxXFxTb2xnZW5cXHNvbGdlbi5wb3J0YWxcXENsaWVudEFwcC9zcmNcXGFwcFxcdmlld3NcXG9wZXJhdGluZy1ob3Vyc1xcb3BlcmF0aW5nLWhvdXJzLWxpc3RcXG9wZXJhdGluZy1ob3Vycy1saXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZ0JBQWdCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC92aWV3cy9vcGVyYXRpbmctaG91cnMvb3BlcmF0aW5nLWhvdXJzLWxpc3Qvb3BlcmF0aW5nLWhvdXJzLWxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjYWRkVGltZXNsb3RCdG4ge1xyXG4gIG1hcmdpbi1sZWZ0OiA5MCU7XHJcbn1cclxuIl19 */");

/***/ }),

/***/ "./src/app/views/operating-hours/operating-hours-list/operating-hours-list.component.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/views/operating-hours/operating-hours-list/operating-hours-list.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: OperatingHoursListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OperatingHoursListComponent", function() { return OperatingHoursListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_operating_hours_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/operating-hours.service */ "./src/app/views/operating-hours/services/operating-hours.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _add_edit_operating_hour_modal_add_edit_operating_hour_modal_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../add-edit-operating-hour-modal/add-edit-operating-hour-modal.component */ "./src/app/views/operating-hours/add-edit-operating-hour-modal/add-edit-operating-hour-modal.component.ts");
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









var OperatingHoursListComponent = /** @class */ (function () {
    function OperatingHoursListComponent(operatingHoursService, commonService, fb, toaster, dialogService, datePipe) {
        this.operatingHoursService = operatingHoursService;
        this.commonService = commonService;
        this.fb = fb;
        this.toaster = toaster;
        this.dialogService = dialogService;
        this.datePipe = datePipe;
        this.listFilter = '';
        this.pageSizeValue = 10;
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_2__["SelectionType"];
        this.loadSave = false;
        this.isEdit = false;
        this.selected = [];
        this.pagedData = {
            pager: {},
            data: [],
        };
        this.timepickerVisible = true;
        this.isAddForm = false;
        this.operatingHoursParams = {
            filter: '',
            sortColumn: 'createdDate',
            sortDir: 'desc',
            page: 0,
            pageSize: 10,
        };
    }
    OperatingHoursListComponent.prototype.ngOnInit = function () {
        this.getOperatingHoursList();
        this.getPageSizes();
    };
    Object.defineProperty(OperatingHoursListComponent.prototype, "name", {
        get: function () {
            return this.addOperatingHoursForm.get('name');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OperatingHoursListComponent.prototype, "description", {
        get: function () {
            return this.addOperatingHoursForm.get('description');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OperatingHoursListComponent.prototype, "timeZone", {
        get: function () {
            return this.addOperatingHoursForm.get('timeZone');
        },
        enumerable: true,
        configurable: true
    });
    OperatingHoursListComponent.prototype.getTransformedDate = function (date) {
        if (!date)
            return;
        return this.datePipe.transform(new Date());
    };
    OperatingHoursListComponent.prototype.editFormForSlots = function (param) {
        var _this = this;
        this.addOperatingHoursForm = this.fb.group({
            name: [param.name, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            description: [param.description, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            timeZone: [param.timeZone, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            id: [param.id],
            statusId: [param.statusId],
            timeSlots: this.fb.array([]),
        });
        var arry = this.addOperatingHoursForm.get('timeSlots');
        while (arry.controls.length > 0) {
            arry.removeAt(0);
        }
        param.timeSlots.forEach(function (s) {
            _this.addOperatingHoursForm.get('timeSlots').push(_this.fb.group({
                id: [s.id],
                dayOfWeek: [s.dayOfWeek],
                startTime: [s.startTime],
                endTime: [s.endTime],
                workType: [s.workType],
                statusId: [s.statusId],
            }));
        });
    };
    OperatingHoursListComponent.prototype.onAddTimeslot = function () {
        this.addOperatingHoursForm.get('timeSlots').push(this.fb.group({
            id: [null],
            dayOfWeek: [null],
            startTime: [null],
            endTime: [null],
            workType: [null],
            statusId: ['1001'],
        }));
    };
    OperatingHoursListComponent.prototype.onDeleteTimeslot = function (id, index) {
        var _this = this;
        if (id) {
            this.operatingHoursService.deleteOperatingHoursTimeSlot(id).subscribe(function (res) {
                var array = _this.addOperatingHoursForm.get('timeSlots');
                array.removeAt(index);
            });
        }
        else {
            var array = this.addOperatingHoursForm.get('timeSlots');
            array.removeAt(index);
        }
    };
    OperatingHoursListComponent.prototype.getOperatingHoursList = function () {
        var _this = this;
        this.operatingHoursService.getOperatingHoursList(this.operatingHoursParams).subscribe(function (res) {
            _this.pagedData = {
                data: res.data,
                pager: res.pager,
            };
            _this.offset = 1;
            _this.loading = false;
        }, function (err) {
            _this.loading = false;
        });
    };
    OperatingHoursListComponent.prototype.handleTimeZoneChange = function () { };
    OperatingHoursListComponent.prototype.updateFilter = function (event) {
        this.operatingHoursParams.filter = event.target.value;
        var keycode = event.keyCode ? event.keyCode : event.which;
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    OperatingHoursListComponent.prototype.search = function () {
        this.currentPage = 1;
        this.operatingHoursParams.filter = '';
        if (this.listFilter.trim().length > 0) {
            this.operatingHoursParams.filter = this.listFilter;
        }
        this.refresh();
    };
    OperatingHoursListComponent.prototype.reset = function () {
        this.listFilter = '';
        this.operatingHoursParams.filter = '';
        this.currentPage = 1;
        this.refresh();
    };
    OperatingHoursListComponent.prototype.showpopup = function (params) {
        var _this = this;
        this.isAddForm = true;
        this.addOperatingHoursModal.showpopup(params);
        this.addOperatingHoursModal.onAdd.subscribe(function (r) { return _this.refresh(); });
    };
    Object.defineProperty(OperatingHoursListComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    OperatingHoursListComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList('PageSize').subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    OperatingHoursListComponent.prototype.setPage = function ($event) {
        this.loading = true;
        this.currentPage = $event.page - 1;
        this.operatingHoursParams.page = $event.page - 1;
        this.refresh();
    };
    OperatingHoursListComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = 1;
        this.refresh();
    };
    OperatingHoursListComponent.prototype.onChange = function ($event) {
        this.currentPage = 1;
        this.refresh();
    };
    OperatingHoursListComponent.prototype.deleteForm = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete this form?";
        this.dialogService.confirm('DELETE FORM', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.loadSave = true;
                _this.operatingHoursService.deleteOperatingHours(row.id).subscribe(function (result) {
                    _this.loadSave = false;
                    _this.toaster.success("Form has been deleted successfully.");
                    _this.deleteId = '';
                    _this.refresh();
                }, function (error) { }, function () {
                    _this.loadSave = false;
                });
            }
        });
    };
    OperatingHoursListComponent.prototype.onDeleteMultipleOperatingHours = function () {
        var _this = this;
        if (this.deleteId) {
            var message = "Are you sure you want to delete multiple forms?";
            this.dialogService.confirm('DELETE Operating Hours', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.loadSave = true;
                    _this.operatingHoursService.deleteMultipleOperatingHours(_this.deleteId).subscribe(function (result) {
                        _this.loadSave = false;
                        _this.toaster.success("Forms has been deleted successfully.");
                        _this.deleteId = '';
                        _this.refresh();
                    }, function (error) { }, function () {
                        _this.loadSave = false;
                    });
                }
            });
        }
        else {
            this.toaster.error('Please select at least one row.');
        }
    };
    OperatingHoursListComponent.prototype.refresh = function () {
        var _this = this;
        this.loading = true;
        this.operatingHoursService.getOperatingHoursList(this.operatingHoursParams).subscribe(function (response) {
            _this.pagedData = {
                data: response.data,
                pager: response.pager,
            };
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    OperatingHoursListComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        if (this.deleteId == '' || this.deleteId == null || this.deleteId == 'undefined') {
            this.selected.splice(0, this.selected.length);
            (_b = this.selected).push.apply(_b, selected);
            this.deleteId = null;
            this.deleteId = '';
            for (var i = 0; i < selected.length; i++) {
                this.deleteId += selected[i].id.toString() + ',';
            }
        }
        else {
            this.deleteId = null;
            this.deleteId = '';
            for (var i = 0; i < selected.length; i++) {
                this.deleteId += selected[i].id.toString() + ',';
            }
        }
    };
    OperatingHoursListComponent.ctorParameters = function () { return [
        { type: _services_operating_hours_service__WEBPACK_IMPORTED_MODULE_4__["OperatingHoursService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_7__["DatePipe"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addEditModal', { static: false }),
        __metadata("design:type", _add_edit_operating_hour_modal_add_edit_operating_hour_modal_component__WEBPACK_IMPORTED_MODULE_8__["AddEditOperatingHourModalComponent"])
    ], OperatingHoursListComponent.prototype, "addOperatingHoursModal", void 0);
    OperatingHoursListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-operating-hours-list',
            template: __importDefault(__webpack_require__(/*! raw-loader!./operating-hours-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/operating-hours/operating-hours-list/operating-hours-list.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./operating-hours-list.component.scss */ "./src/app/views/operating-hours/operating-hours-list/operating-hours-list.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_services_operating_hours_service__WEBPACK_IMPORTED_MODULE_4__["OperatingHoursService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_7__["DatePipe"]])
    ], OperatingHoursListComponent);
    return OperatingHoursListComponent;
}());



/***/ }),

/***/ "./src/app/views/operating-hours/operating-hours-routing.module.ts":
/*!*************************************************************************!*\
  !*** ./src/app/views/operating-hours/operating-hours-routing.module.ts ***!
  \*************************************************************************/
/*! exports provided: OperatingHoursRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OperatingHoursRoutingModule", function() { return OperatingHoursRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _operating_hours_list_operating_hours_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./operating-hours-list/operating-hours-list.component */ "./src/app/views/operating-hours/operating-hours-list/operating-hours-list.component.ts");
/* harmony import */ var _operating_hours_view_operating_hours_view_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./operating-hours-view/operating-hours-view.component */ "./src/app/views/operating-hours/operating-hours-view/operating-hours-view.component.ts");
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
        path: '',
        component: _operating_hours_list_operating_hours_list_component__WEBPACK_IMPORTED_MODULE_2__["OperatingHoursListComponent"],
        data: { title: 'Manage Operating Hours' }
    },
    {
        path: 'view/:id',
        component: _operating_hours_view_operating_hours_view_component__WEBPACK_IMPORTED_MODULE_3__["OperatingHoursViewComponent"],
        data: { title: 'Manage Operating Hours View' }
    },
];
var OperatingHoursRoutingModule = /** @class */ (function () {
    function OperatingHoursRoutingModule() {
    }
    OperatingHoursRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], OperatingHoursRoutingModule);
    return OperatingHoursRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/operating-hours/operating-hours-view/operating-hours-view.component.scss":
/*!************************************************************************************************!*\
  !*** ./src/app/views/operating-hours/operating-hours-view/operating-hours-view.component.scss ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL29wZXJhdGluZy1ob3Vycy9vcGVyYXRpbmctaG91cnMtdmlldy9vcGVyYXRpbmctaG91cnMtdmlldy5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/operating-hours/operating-hours-view/operating-hours-view.component.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/views/operating-hours/operating-hours-view/operating-hours-view.component.ts ***!
  \**********************************************************************************************/
/*! exports provided: OperatingHoursViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OperatingHoursViewComponent", function() { return OperatingHoursViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _services_operating_hours_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/operating-hours.service */ "./src/app/views/operating-hours/services/operating-hours.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _add_edit_operating_hour_modal_add_edit_operating_hour_modal_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../add-edit-operating-hour-modal/add-edit-operating-hour-modal.component */ "./src/app/views/operating-hours/add-edit-operating-hour-modal/add-edit-operating-hour-modal.component.ts");
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






var OperatingHoursViewComponent = /** @class */ (function () {
    function OperatingHoursViewComponent(route, operatingHoursService, commonService, location) {
        this.route = route;
        this.operatingHoursService = operatingHoursService;
        this.commonService = commonService;
        this.location = location;
        this.loadSave = false;
        this.timeZoneName = "";
    }
    OperatingHoursViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            _this.id = params.get('id');
            _this.loadViewData(_this.id);
        });
    };
    OperatingHoursViewComponent.prototype.getTimeZones = function (id) {
        var _this = this;
        this.commonService.getTimeZoneList().subscribe(function (res) {
            var timezoneList = JSON.parse(res);
            debugger;
            var time = timezoneList.find(function (x) { return x.value == id; });
            _this.timeZoneName = time ? time.text : "";
        });
    };
    OperatingHoursViewComponent.prototype.loadViewData = function (id) {
        var _this = this;
        this.operatingHoursService.getOperatingHoursById(id).subscribe(function (response) {
            _this.operatingHours = response;
            _this.getTimeZones(_this.operatingHours.timeZone);
            console.log(response);
        });
    };
    OperatingHoursViewComponent.prototype.deleteTimeSlot = function (id) {
        var _this = this;
        debugger;
        if (id) {
            this.operatingHoursService.deleteOperatingHoursTimeSlot(id).subscribe(function (res) {
                _this.operatingHours.timeSlots = _this.operatingHours.timeSlots.filter(function (t) { return t.id !== id; });
            });
        }
    };
    OperatingHoursViewComponent.prototype.showpopup = function (params) {
        this.isAddForm = true;
        this.addOperatingHoursModal.showpopup(params);
    };
    OperatingHoursViewComponent.prototype.onBack = function () {
        this.location.back();
    };
    OperatingHoursViewComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _services_operating_hours_service__WEBPACK_IMPORTED_MODULE_3__["OperatingHoursService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_4__["Location"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addEditModal', { static: false }),
        __metadata("design:type", _add_edit_operating_hour_modal_add_edit_operating_hour_modal_component__WEBPACK_IMPORTED_MODULE_5__["AddEditOperatingHourModalComponent"])
    ], OperatingHoursViewComponent.prototype, "addOperatingHoursModal", void 0);
    OperatingHoursViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-operating-hours-view',
            template: __importDefault(__webpack_require__(/*! raw-loader!./operating-hours-view.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/operating-hours/operating-hours-view/operating-hours-view.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./operating-hours-view.component.scss */ "./src/app/views/operating-hours/operating-hours-view/operating-hours-view.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_operating_hours_service__WEBPACK_IMPORTED_MODULE_3__["OperatingHoursService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["Location"]])
    ], OperatingHoursViewComponent);
    return OperatingHoursViewComponent;
}());



/***/ }),

/***/ "./src/app/views/operating-hours/operating-hours.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/views/operating-hours/operating-hours.module.ts ***!
  \*****************************************************************/
/*! exports provided: OperatingHoursModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OperatingHoursModule", function() { return OperatingHoursModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _operating_hours_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./operating-hours-routing.module */ "./src/app/views/operating-hours/operating-hours-routing.module.ts");
/* harmony import */ var _operating_hours_list_operating_hours_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./operating-hours-list/operating-hours-list.component */ "./src/app/views/operating-hours/operating-hours-list/operating-hours-list.component.ts");
/* harmony import */ var primeng_colorpicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeng/colorpicker */ "./node_modules/primeng/colorpicker.js");
/* harmony import */ var primeng_colorpicker__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(primeng_colorpicker__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var primeng_components_dragdrop_dragdrop__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! primeng/components/dragdrop/dragdrop */ "./node_modules/primeng/components/dragdrop/dragdrop.js");
/* harmony import */ var primeng_components_dragdrop_dragdrop__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(primeng_components_dragdrop_dragdrop__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var primeng_orderlist__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! primeng/orderlist */ "./node_modules/primeng/orderlist.js");
/* harmony import */ var primeng_orderlist__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(primeng_orderlist__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _operating_hours_view_operating_hours_view_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./operating-hours-view/operating-hours-view.component */ "./src/app/views/operating-hours/operating-hours-view/operating-hours-view.component.ts");
/* harmony import */ var _add_edit_operating_hour_modal_add_edit_operating_hour_modal_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./add-edit-operating-hour-modal/add-edit-operating-hour-modal.component */ "./src/app/views/operating-hours/add-edit-operating-hour-modal/add-edit-operating-hour-modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};









//import { SharedModule } from 'primeng/primeng';




var OperatingHoursModule = /** @class */ (function () {
    function OperatingHoursModule() {
    }
    OperatingHoursModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_operating_hours_list_operating_hours_list_component__WEBPACK_IMPORTED_MODULE_3__["OperatingHoursListComponent"], _operating_hours_view_operating_hours_view_component__WEBPACK_IMPORTED_MODULE_11__["OperatingHoursViewComponent"], _add_edit_operating_hour_modal_add_edit_operating_hour_modal_component__WEBPACK_IMPORTED_MODULE_12__["AddEditOperatingHourModalComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _operating_hours_routing_module__WEBPACK_IMPORTED_MODULE_2__["OperatingHoursRoutingModule"],
                primeng_colorpicker__WEBPACK_IMPORTED_MODULE_4__["ColorPickerModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_6__["NgxDatatableModule"],
                primeng_components_dragdrop_dragdrop__WEBPACK_IMPORTED_MODULE_7__["DragDropModule"],
                primeng_orderlist__WEBPACK_IMPORTED_MODULE_8__["OrderListModule"],
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"],
                ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_9__["ModalModule"],
            ],
            providers: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DatePipe"]],
        })
    ], OperatingHoursModule);
    return OperatingHoursModule;
}());



/***/ }),

/***/ "./src/app/views/operating-hours/services/operating-hours.service.ts":
/*!***************************************************************************!*\
  !*** ./src/app/views/operating-hours/services/operating-hours.service.ts ***!
  \***************************************************************************/
/*! exports provided: OperatingHoursService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OperatingHoursService", function() { return OperatingHoursService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
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



var OperatingHoursService = /** @class */ (function () {
    function OperatingHoursService(http) {
        this.http = http;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].WebApiBaseUrl;
    }
    OperatingHoursService.prototype.getOperatingHoursList = function (params) {
        return this.http.get(this.baseUri + "OperatingHours/GetOperatingHoursList", {
            params: {
                filter: params.filter,
                sortColumn: params.sortColumn,
                sortDir: params.sortDir,
                page: params.page,
                pageSize: params.pageSize
            }
        });
    };
    OperatingHoursService.prototype.getOperatingHoursById = function (id) {
        return this.http.get(this.baseUri + "OperatingHours/GetOperatingHoursById", {
            params: {
                Id: id
            }
        });
    };
    OperatingHoursService.prototype.addOperatingHours = function (operatingHours) {
        return this.http.post(this.baseUri + "OperatingHours/AddEditOperatingHours", operatingHours);
    };
    OperatingHoursService.prototype.deleteOperatingHours = function (id) {
        return this.http.post(this.baseUri + "OperatingHours/DeleteOperatingHours", null, {
            params: { id: id }
        });
    };
    OperatingHoursService.prototype.deleteMultipleOperatingHours = function (ids) {
        return this.http.post(this.baseUri + "OperatingHours/DeleteMultipleOperatingHours", null, {
            params: { ids: ids }
        });
    };
    OperatingHoursService.prototype.deleteOperatingHoursTimeSlot = function (id) {
        return this.http.post(this.baseUri + "OperatingHours/DeleteOperatingHoursTimeSlot", null, {
            params: { id: id }
        });
    };
    OperatingHoursService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"] }
    ]; };
    OperatingHoursService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]])
    ], OperatingHoursService);
    return OperatingHoursService;
}());



/***/ })

}]);
//# sourceMappingURL=views-operating-hours-operating-hours-module.js.map