(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~views-calendar-calendarlist-module~views-lead-lead-module~views-opportunity-opportunity-modu~b75b56f4"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/calendar/calendarlist.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/calendar/calendarlist.component.html ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Calendar</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li class=\"active\">Calendar</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \">\r\n    <div class=\"row justify-content-between\">\r\n      <div class=\"col-lg-12 d-flex justify-content-end \" *ngIf=\"!isContact\">\r\n        <a *ngIf='isAdd' href=\"javascript:void(0);\" (click)=\"makeAppointment()\" class=\"btn btn-success form-btns\" tooltip=\"Make an Appointment\"><i class=\"fa fa-calendar\"></i> </a>\r\n      </div>\r\n      <hr class=\"my-3\" />\r\n      <div class=\"col-lg-6 calendar-table\">\r\n        <ng-fullcalendar #fullcalendar\r\n                         (dateClick)=\"dateClick($event)\"\r\n                         (clickButton)=\"clickButton($event)\"\r\n                         (eventDragStop)=\"eventDragStop($event)\"\r\n                         [eventsModel]=\"eventsModel\"\r\n                         [options]=\"options\"\r\n                         (eventClick)=\"eventClick($event)\"></ng-fullcalendar>\r\n      </div>\r\n      <div class=\"col-lg-6 pl-3\">\r\n        <div class=\"appointment-list\">\r\n          <div class=\"table-responsive border\">\r\n            <div class=\"table table-striped\">\r\n              <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                             [rows]=\"pagedData.data\"\r\n                             [scrollbarH]=\"true\"\r\n                             [rowHeight]=\"'40'\"\r\n                             [columnMode]=\"'force'\"\r\n                             [headerHeight]=\"40\"\r\n                             [footerHeight]=\"40\"\r\n                             [externalPaging]=\"true\"\r\n                             [externalSorting]=\"true\"\r\n                             [loadingIndicator]=\"loadSave\"\r\n                             [count]=\"pagedData.pager.totalItems\"\r\n                             [offset]=\"pagedData.pager.currentPage\"\r\n                             [limit]=\"pagedData.pager.pageSize\"\r\n                             (page)='setPage($event)'>\r\n                <ngx-datatable-column name=\"Appointment\" [sortable]=\"true\" prop=\"Appointment\" *ngIf=\"!isContact && !isFinancialInstitute\">\r\n                </ngx-datatable-column>\r\n                <ngx-datatable-column name=\"Assigned User\" prop=\"AssignedUser\" [sortable]=\"true\" *ngIf=\"!isContact\"></ngx-datatable-column>\r\n                <ngx-datatable-column name=\"Time\" prop=\"Time\" [sortable]=\"true\"></ngx-datatable-column>\r\n                <ngx-datatable-column name=\"Appointment Date\" prop=\"AppointmentDueDate\" [sortable]=\"true\" *ngIf=\"!isContact\">\r\n\r\n                  <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                    {{ (row.AppointmentDueDate !== null) ? (row.AppointmentDueDate | DateTimeToLocal) : \"\" }}\r\n                  </ng-template>\r\n\r\n                </ngx-datatable-column>\r\n                <ngx-datatable-column name=\"Appointment Date\" prop=\"AppointmentDueDate\" [sortable]=\"true\" *ngIf=\"isContact\">\r\n\r\n                  <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                    {{row.AppointmentDueDate}}\r\n                  </ng-template>\r\n\r\n                </ngx-datatable-column>\r\n                <ngx-datatable-column name=\"Description\" prop=\"Description\" [sortable]=\"true\" *ngIf=\"isContact\">\r\n                  <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                    <div>\r\n                      <a href=\"javascript:void(0);\" (click)=\"DisplayDescription(row)\" [title]=\"row.Description\">{{row.Description | truncate}}</a>\r\n                    </div>\r\n\r\n                  </ng-template>\r\n\r\n                </ngx-datatable-column>\r\n                <ngx-datatable-column name=\"Appointment Status\" prop=\"AppointmentStatus\" [sortable]=\"true\"></ngx-datatable-column>\r\n                <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\" *ngIf=\"!isContact\">\r\n                  <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                    <div class=\"text-center\">\r\n                      <a *ngIf='isUpdate' href=\"javascript:void(0);\" (click)=\"editAppointment(row)\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                      <a *ngIf='isDelete' href=\"javascript:void(0);\" (click)=\"deleteAppointment(row)\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                    </div>\r\n\r\n                  </ng-template>\r\n                </ngx-datatable-column>\r\n\r\n\r\n\r\n\r\n\r\n                <ngx-datatable-footer>\r\n                  <ng-template ngx-datatable-footer-template\r\n                               let-rowCount=\"rowCount\"\r\n                               let-pageSize=\"pageSize\"\r\n                               let-selectedCount=\"selectedCount\"\r\n                               let-currentPage=\"currentPage\"\r\n                               let-offset=\"offset\"\r\n                               let-isVisible=\"isVisible\">\r\n                    <div class=\"page-count\">\r\n                      {{rowCount}} total\r\n                    </div>\r\n                    <div>\r\n                      <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                        <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                          <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                     bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                    <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                     [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                     [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                     [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                     [page]=\"pagedData.pager.currentPage+1\"\r\n                                     [size]=\"pageSizeValue\"\r\n                                     [count]=\"pagedData.pager.totalItems\"\r\n                                     [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                     (change)=\"setPage($event)\">\r\n                    </datatable-pager>\r\n                  </ng-template>\r\n                </ngx-datatable-footer>\r\n              </ngx-datatable>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>\r\n\r\n\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n<app-makeappointment #makeappointment (Onsaved)=\"OnDialogSaved($event)\"></app-makeappointment>\r\n<app-callandardetail #callandarDetail></app-callandardetail>\r\n\r\n\r\n\r\n\r\n\r\n\r\n<div bsModal #messageDetailsPopup=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Description Detail</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closemessageDetailsPopup()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <!--<div class=\"modal-body\" style=\" margin-bottom:10px; min-height:300px; max-height:300px\">\r\n        <div class=\"col-lg-12\">\r\n          <div class=\"table-responsive\">\r\n            <div class=\"col-lg-12\">\r\n              {{messageContent}}\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n      </div>-->\r\n      <div class=\"modal-body\" style=\" margin-bottom:10px; max-height:600px; overflow:visible;\">\r\n        <div [ngClass]=\"{'disabled':loadSave}\">\r\n          <div class=\"row\">\r\n            <div class=\"col-12 col-md-12 col-lg-12\">\r\n              <div class=\"form-group\">\r\n                {{messageContent}}\r\n\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-danger text-white\" (click)=\"closemessageDetailsPopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/calendar/callanderdetail/callandardetail.component.html":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/calendar/callanderdetail/callandardetail.component.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #callendarDetail=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Site Audit</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow:auto; margin-bottom:10px; height:668px;\">\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12\">\r\n            <table class=\"tablestriped_data mb-3\">\r\n\r\n              <tbody>\r\n                <tr>\r\n                  <td><label><strong>Time:</strong></label></td>\r\n                  <td>12:00 PM - 1:00 PM<br />Monday, 30 August 2020</td>\r\n                </tr>\r\n                <tr>\r\n                  <td><label><strong>Assigned User:</strong></label></td>\r\n                  <td>Andrew Vick</td>\r\n                </tr>\r\n                <tr>\r\n                  <td><label><strong>Location:</strong></label></td>\r\n                  <td>2379 Bell Street,New york ,10014</td>\r\n                </tr>\r\n                <tr>\r\n                  <td><label><strong>Description:</strong></label></td>\r\n                  <td>Need to site visit, to get detailled information.</td>\r\n                </tr>\r\n                <tr>\r\n              </tbody>\r\n            </table>\r\n        \r\n            <div class=\"col-lg-12\">\r\n                <div class=\"graph text-center\">\r\n                  <img src=\"../../../../assets/default-theme/images/fgEnRkO.png\" />\r\n                </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <!--<button type=\"submit\" class=\"btn btn-primary form-btns\" (click)=\"Save()\"><i class=\"fa fa-save text-white\"></i> Save</button>-->\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/calendar/makeappointment/makeappointment.component.html":
/*!*********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/calendar/makeappointment/makeappointment.component.html ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #makeappointment=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">{{title}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\" margin-bottom:10px; max-height:600px; overflow:visible;\">\r\n        <form [formGroup]=\"addForm\" autocomplete=\"off\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n              <!--<h4>if would like Enerflo to automatically find the best apt time based on availalility.</h4>-->\r\n              <div class=\"row\">\r\n                <div class=\"col-12 col-md-6 col-lg-6\" *ngIf=\"comptype!='undefined' && comptype.companyType!='companytypeFinancialInstitute'\">\r\n                  <label>Appointment Type:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select #clearDrop [items]=\"lstappointment\"\r\n                               placeholder=\"Select Appointment Type\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"appointmenttypeId\"\r\n                               [closeOnSelect]=\"true\"\r\n                               [ngClass]=\"{'is-invalid': (appointmenttypeId.invalid && (appointmenttypeId.dirty || appointmenttypeId.touched) && appointmenttypeId.errors?.required) }\">\r\n                    </ng-select>\r\n                    <small *ngIf=\"appointmenttypeId.invalid && (appointmenttypeId.dirty || appointmenttypeId.touched) && appointmenttypeId.errors?.required\"\r\n                           style=\"color:red;\">Please select Appointment Type</small>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-12 col-md-6 col-lg-6\" *ngIf=\"comptype!='undefined' && comptype.companyType!='companytypeFinancialInstitute'\">\r\n                  <label>Appointment Object:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select #clearAppointment [items]=\"appointments\"\r\n                               placeholder=\"Select Appointment Type\" bindValue=\"value\" bindLabel=\"text\"\r\n                               formControlName=\"appointmentWith\" (change)=\"selectAppointmentWith($event)\"\r\n                               [closeOnSelect]=\"true\" [ngClass]=\"{'is-invalid': (appointmentWith.invalid && (appointmentWith.dirty || appointmentWith.touched) && appointmentWith.errors?.required) }\">\r\n                    </ng-select>\r\n                    <small *ngIf=\"appointmentWith.invalid && (appointmentWith.dirty || appointmentWith.touched) && appointmentWith.errors?.required\"\r\n                           style=\"color:red;\">Please select Appointment Object</small>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Customer:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select #clearDrop [items]=\"customers\"\r\n                               placeholder=\"Select Customer\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"customer\" (change)=\"setcustomerid($event)\"\r\n                               [closeOnSelect]=\"true\" [ngClass]=\"{'is-invalid': (customer.invalid && (customer.dirty || customer.touched) && customer.errors?.required) }\">\r\n\r\n                      <ng-template ng-option-tmp let-item=\"item\" let-index=\"index\" let-search=\"searchTerm\" class=\"p-1\">\r\n\r\n                        <div style=\"margin: 1px 0;\" class=\"card\">\r\n                          <div class=\"card-body p-2\">\r\n                            <h5 class=\"card-title mb-1 custmr-name\" [ngOptionHighlight]=\"search\">{{item.text}}</h5>\r\n                            <p class=\"p-0 m-0\"><i class=\"fa fa-envelope\"></i> {{item.email}}  <i class=\"fa fa-phone ml-3\"></i>  {{item.mobilePhone}}</p>\r\n\r\n                          </div>\r\n                        </div>\r\n                      </ng-template>\r\n\r\n\r\n                    </ng-select>\r\n                    <small *ngIf=\"customer.invalid && (customer.dirty || customer.touched) && customer.errors?.required\"\r\n                           style=\"color:red;\">Please select Customer</small>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-12 col-md-6 col-lg-6\" *ngIf=\"comptype.companyType!= 'companytypeFinancialInstitute'\">\r\n                  <label>Appointment Status:</label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select #clearDrop [items]=\"lstappointmentstatus\"\r\n                               formControlName=\"appointmentstatusId\"\r\n                               placeholder=\"Select Appointment Status\"\r\n                               bindValue=\"value\"\r\n                               bindLabel=\"text\"\r\n                               [closeOnSelect]=\"true\">\r\n                    </ng-select>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-12 col-md-6 col-lg-6\" *ngIf=\"comptype.companyType == 'companytypeFinancialInstitute'\">\r\n                  <label>Appointment Status1:</label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select #clearDrop [items]=\"lstappointmentstatusForFinancialInstitute\"\r\n                               formControlName=\"appointmentstatusId\"\r\n                               placeholder=\"Select Appointment Status\"\r\n                               bindValue=\"value\"\r\n                               bindLabel=\"text\"\r\n                               [closeOnSelect]=\"true\">\r\n                    </ng-select>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Date:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group datepickerinpop\">\r\n                    <p-calendar class=\"calendarwidth\" inputStyleClass=\"form-control start-date\" [minDate]=\"minimumDate\" formControlName=\"appointmentDueDate\" placeholder=\"Select Date\" [showIcon]=\"true\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n                                (onSelect)=\"OnChanged($event)\"\r\n                                [ngClass]=\"{'is-invalid': (appointmentDueDate.invalid && (appointmentDueDate.dirty || appointmentDueDate.touched) && appointmentDueDate.errors?.required) }\"></p-calendar>\r\n                    <small *ngIf=\"appointmentDueDate.invalid && (appointmentDueDate.dirty || appointmentDueDate.touched) && appointmentDueDate.errors?.required\"\r\n                           style=\"color:red;\">Please select Date</small>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-12 col-md-6 col-lg-3\" *ngIf=\"showTime\">\r\n                  <label>From:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <p-calendar inputStyleClass=\"form-control start-date\"\r\n                                formControlName=\"fromTime\" placeholder=\"Select From Time\" hourFormat=\"12\"\r\n                                [timeOnly]=\"true\" inputId=\"timeonly\" [(ngModel)]=\"FromTimemodel\" [ngClass]=\"{'is-invalid': (fromTime.invalid && (fromTime.dirty || fromTime.touched) && fromTime.errors?.required) }\" (onSelect)=\"changeToValue($event)\" [minDate]=\"minFromTime\" [maxDate]=\"maxToTime\"></p-calendar>\r\n                    <small *ngIf=\"fromTime.invalid && (fromTime.dirty || fromTime.touched) && fromTime.errors?.required\"\r\n                           style=\"color:red;\">Please select From Time</small>\r\n\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-12 col-md-6 col-lg-3\" *ngIf=\"showTime\">\r\n                  <label>To:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <p-calendar inputStyleClass=\"form-control start-date\"\r\n                                formControlName=\"toTime\" placeholder=\"Select To Time\" hourFormat=\"12\"\r\n                                [timeOnly]=\"true\" inputId=\"timeonly1\" [(ngModel)]=\"todate\" [ngClass]=\"{'is-invalid': (toTime.invalid && (toTime.dirty || toTime.touched) && toTime.errors?.required) }\" [minDate]=\"minToTime\" [maxDate]=\"maxToTime\" (onSelect)=\"changeTotimeValue($event)\"></p-calendar>\r\n                    <small *ngIf=\"toTime.invalid && (toTime.dirty || toTime.touched) && toTime.errors?.required\"\r\n                           style=\"color:red;\">Please select To Time</small>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-12 col-md-12 col-lg-12\">\r\n                  <label>Description:</label>\r\n                  <div class=\"form-group\">\r\n                    <textarea class=\"form-control\" formControlName=\"description\" maxlength=\"100\"></textarea>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n          </div>\r\n            </div>\r\n</form>\r\n      </div>\r\n         \r\n      <div class=\"modal-footer\">\r\n        <button *ngIf='addOrUpdatePermission' type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"Save()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./src/app/views/bank/bank.service.ts":
/*!********************************************!*\
  !*** ./src/app/views/bank/bank.service.ts ***!
  \********************************************/
/*! exports provided: BankService, BankModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BankService", function() { return BankService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BankModel", function() { return BankModel; });
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





var BankService = /** @class */ (function () {
    function BankService(http, commonService) {
        this.http = http;
        this.commonService = commonService;
        this.baseUri = "" + src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
    }
    //function used to fetch list of Bank
    BankService.prototype.getBankList = function (name, sortColumn, sortDir, page, pageSize, userId) {
        var _this = this;
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.baseUri + ("Bank/GetBankList?nameSearch=" + name + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&pageIndex=" + page + "&pageSize=" + pageSize + "&userId=" + userId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    //function used to set active/inactive status of Bank
    BankService.prototype.setBankStatus = function (tableName, primaryKey, status, moduleName, statusName) {
        return this.commonService.ActiveInactive(tableName, primaryKey, status, moduleName, statusName);
    };
    //function is used to get detail of  user
    BankService.prototype.getBankDetail = function (id) {
        return this.http.get(this.baseUri + ("Bank/GetBankDetailById?Bankid=" + id));
    };
    //function is used to delte the  user
    BankService.prototype.deleteBank = function (tableName, primaryid, moduleName) {
        return this.commonService.Delete(tableName, primaryid, moduleName);
    };
    //function is used to add edit vendor
    BankService.prototype.addEditBank = function (bankModel) {
        return this.http.post(this.baseUri + "Bank/AddEditBank", bankModel);
    };
    BankService.prototype.getusersBankList = function (page, pageSize, bankId) {
        var _this = this;
        return this.http.get(this.baseUri + ("Bank/GetUsersBankList?pageIndex=" + page + "&pageSize=" + pageSize + "&bankId=" + bankId))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    BankService.prototype.getBankDropdownList = function () {
        return this.http.get(this.baseUri + "Bank/GetBankDropList");
    };
    BankService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] }
    ]; };
    BankService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"]])
    ], BankService);
    return BankService;
}());

var BankModel = /** @class */ (function () {
    function BankModel() {
        this.id = "";
        this.bankName = "";
        this.city = "";
        this.county = "";
        this.stateId = "";
        this.statusId = "";
        this.address = "";
        this.phone = "";
        this.zipCode = "";
    }
    return BankModel;
}());



/***/ }),

/***/ "./src/app/views/calendar/calendarlist-routing.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/views/calendar/calendarlist-routing.module.ts ***!
  \***************************************************************/
/*! exports provided: CalendarListRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarListRoutingModule", function() { return CalendarListRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _calendarlist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./calendarlist.component */ "./src/app/views/calendar/calendarlist.component.ts");
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
    { path: '', component: _calendarlist_component__WEBPACK_IMPORTED_MODULE_2__["CalendarListComponent"] },
];
var CalendarListRoutingModule = /** @class */ (function () {
    function CalendarListRoutingModule() {
    }
    CalendarListRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], CalendarListRoutingModule);
    return CalendarListRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/calendar/calendarlist.component.scss":
/*!************************************************************!*\
  !*** ./src/app/views/calendar/calendarlist.component.scss ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2NhbGVuZGFyL2NhbGVuZGFybGlzdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/calendar/calendarlist.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/views/calendar/calendarlist.component.ts ***!
  \**********************************************************/
/*! exports provided: CalendarListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarListComponent", function() { return CalendarListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fullcalendar/daygrid */ "./node_modules/@fullcalendar/daygrid/main.esm.js");
/* harmony import */ var _fullcalendar_timegrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fullcalendar/timegrid */ "./node_modules/@fullcalendar/timegrid/main.esm.js");
/* harmony import */ var _fullcalendar_list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fullcalendar/list */ "./node_modules/@fullcalendar/list/main.esm.js");
/* harmony import */ var _fullcalendar_interaction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fullcalendar/interaction */ "./node_modules/@fullcalendar/interaction/main.esm.js");
/* harmony import */ var ng_fullcalendar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-fullcalendar */ "./node_modules/ng-fullcalendar/fesm5/ng-fullcalendar.js");
/* harmony import */ var _makeappointment_makeappointment_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./makeappointment/makeappointment.component */ "./src/app/views/calendar/makeappointment/makeappointment.component.ts");
/* harmony import */ var _callanderdetail_callandardetail_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./callanderdetail/callandardetail.component */ "./src/app/views/calendar/callanderdetail/callandardetail.component.ts");
/* harmony import */ var _calendarlist_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./calendarlist.service */ "./src/app/views/calendar/calendarlist.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
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














var CalendarListComponent = /** @class */ (function () {
    function CalendarListComponent(calendarlistService, dialogService, commonService, router, activeRoute, toaster) {
        // const moduleCode = this.activeRoute.snapshot.data.moduleCode;
        // this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var _this = this;
        this.calendarlistService = calendarlistService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.searchUserType = '';
        //modulePermission: ModuleList;
        this.loadSave = false;
        this.loading = false;
        this.sortDir = 'desc';
        this.day = null;
        this.month = '';
        this.year = '';
        this.sortColumn = 'CreatedOn';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.lastButtonType = 'dayGridMonth';
        this.buttonType = [
            'dayGridMonth',
            'timeGridDay',
            'timeGridWeek'
        ];
        this.isWeekSelected = false;
        this.isContact = false;
        this.isAdd = true;
        this.isFinancialInstitute = false;
        this.isUpdate = true;
        this.isDelete = true;
        this.modulePermission = [];
        //
        //let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'APPOINTMENTADD');
        //if (add == undefined) {
        //  add = "null";
        //} else {
        //  this.isAdd = true;
        //}
        //let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'APPOINTMENTUPDATE');
        //if (update == undefined) {
        //  update = "null";
        //} else {
        //  this.isUpdate = true;
        //}
        //let deletedata = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'APPOINTMENTDELETE');
        //if (deletedata == undefined) {
        //  deletedata = "null";
        //} else {
        //  this.isDelete = true;
        //}
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            console.log("userdetail", userdetail);
            if (userdetail.userType == "usertypecontact") {
                _this.isContact = true;
            }
            else if (userdetail.companyType == "companytypeFinancialInstitute") {
                _this.isFinancialInstitute = true;
            }
        });
    }
    CalendarListComponent.prototype.DayClicked = function (date, jsevent) {
    };
    CalendarListComponent.prototype.ngOnInit = function () {
        this.OnLoad();
    };
    CalendarListComponent.prototype.OnLoad = function () {
        var _this = this;
        localStorage.removeItem('opid');
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.refresh();
        this.currentDate = new Date();
        this.day = null;
        this.eventClick = function (info) {
            var dt = new Date(info.event.start);
            _this.month = (dt.getMonth() + 1).toString();
            _this.year = dt.getFullYear().toString();
            _this.day = dt.getDate().toString();
            _this.calendarlistService.GetAppointments(_this.sortColumn, _this.sortDir, 0, _this.pageSizeValue, _this.loginuserid, _this.day, _this.month, _this.year, _this.isWeekSelected).subscribe(function (response) {
                _this.pagedData = _this.calendarlistService.pagedData;
                _this.loading = false;
            }, function (error) {
                _this.loading = false;
            });
        };
        this.options = {
            selectable: true,
            editable: false,
            navLinks: true,
            navLinkWeekClick: function (s, e) {
            },
            events: [
                {
                    title: 'new demo',
                    start: '2020-09-11',
                    end: '2020-09-11',
                }
            ],
            eventBorderColor: 'transparent',
            eventBackgroundColor: 'yellow ',
            customButtons: {
                myCustomButton: {
                    text: 'custom!',
                    click: function () {
                    }
                }
            },
            header: {
                left: 'prev,next today myCustomButton',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            },
            plugins: [_fullcalendar_daygrid__WEBPACK_IMPORTED_MODULE_1__["default"], _fullcalendar_timegrid__WEBPACK_IMPORTED_MODULE_2__["default"], _fullcalendar_list__WEBPACK_IMPORTED_MODULE_3__["default"], _fullcalendar_interaction__WEBPACK_IMPORTED_MODULE_4__["default"]],
        };
        this.calendarlistService.GetAppointmentsForCalendar('').subscribe(function (s) {
            _this.eventsModel = s;
        });
    };
    CalendarListComponent.prototype.eventClick = function (model) {
    };
    CalendarListComponent.prototype.eventDragStop = function (model) {
    };
    CalendarListComponent.prototype.clickButton = function (model) {
        var _this = this;
        if (!(model.buttonType == 'prev' || model.buttonType == 'next')) {
            if (this.lastButtonType == model.buttonType) {
                return;
            }
            else {
                this.lastButtonType = model.buttonType;
            }
        }
        var dt = new Date(model.data);
        this.month = (dt.getMonth() + 1).toString();
        this.year = dt.getFullYear().toString();
        if (this.lastButtonType == 'dayGridMonth') {
            this.day = null;
            this.isWeekSelected = false;
        }
        else if (this.lastButtonType == 'timeGridWeek') {
            this.isWeekSelected = true;
            dt.setDate(dt.getDate() - dt.getDay());
            this.day = dt.getDate().toString();
            this.isWeekSelected = true;
        }
        else {
            this.isWeekSelected = false;
            this.day = dt.getDate().toString();
        }
        this.calendarlistService.GetAppointments(this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.day, this.month, this.year, this.isWeekSelected).subscribe(function (response) {
            _this.pagedData = _this.calendarlistService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CalendarListComponent.prototype.setPage = function (s) {
        var pageNumber = parseInt(s.page) - 1;
        this.refresh(pageNumber);
    };
    CalendarListComponent.prototype.dateClick = function (model) {
        var _this = this;
        var dt = new Date(model.date);
        this.month = (dt.getMonth() + 1).toString();
        this.year = dt.getFullYear().toString();
        this.day = dt.getDate().toString();
        this.calendarlistService.GetAppointments(this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid, this.day, this.month, this.year, false).subscribe(function (response) {
            _this.pagedData = _this.calendarlistService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CalendarListComponent.prototype.updateEvents = function () {
    };
    Object.defineProperty(CalendarListComponent.prototype, "yearMonth", {
        get: function () {
            var dateObj = new Date();
            return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
        },
        enumerable: true,
        configurable: true
    });
    CalendarListComponent.prototype.makeAppointment = function () {
        this.makeappointment.show();
    };
    CalendarListComponent.prototype.editAppointment = function (row) {
        this.makeappointment.edit(row.AppointmentID);
    };
    CalendarListComponent.prototype.DisplaySiteDetail = function () {
        this.callendarDetail.show();
    };
    CalendarListComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    CalendarListComponent.prototype.refresh = function (pageNum) {
        var _this = this;
        if (pageNum === void 0) { pageNum = 0; }
        var dt = new Date();
        this.month = (dt.getMonth() + 1).toString();
        this.year = dt.getFullYear().toString();
        this.calendarlistService.GetAppointments(this.sortColumn, this.sortDir, pageNum, this.pageSizeValue, this.loginuserid, this.day, this.month, this.year, this.isWeekSelected).subscribe(function (response) {
            _this.pagedData = _this.calendarlistService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    CalendarListComponent.prototype.OnDialogSaved = function (event) {
        this.OnLoad();
    };
    CalendarListComponent.prototype.deleteAppointment = function (appointment) {
        var _this = this;
        var message = "Are you sure you want to delete appointment \"" + appointment.Appointment + "\"?";
        this.dialogService.confirm('Delete Appointment', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.calendarlistService.deleteAppointment(appointment.AppointmentID).subscribe(function (response) {
                    if (response.responseMessage == "Success") {
                        _this.toaster.success("Appointment \"" + appointment.Appointment + "\" has been deleted successfully");
                        _this.OnLoad();
                    }
                    else {
                        _this.toaster.error(response.responseMessage);
                    }
                }, function (error) {
                });
            }
        });
    };
    CalendarListComponent.prototype.DisplayDescription = function (row) {
        this.messageContent = row.Description;
        this.attendancemodel.show();
    };
    CalendarListComponent.prototype.closemessageDetailsPopup = function () {
        this.attendancemodel.hide();
    };
    CalendarListComponent.ctorParameters = function () { return [
        { type: _calendarlist_service__WEBPACK_IMPORTED_MODULE_8__["CalendarlistService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_12__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_9__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_10__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('makeappointment', { static: false }),
        __metadata("design:type", _makeappointment_makeappointment_component__WEBPACK_IMPORTED_MODULE_6__["MakeappointmentComponent"])
    ], CalendarListComponent.prototype, "makeappointment", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('callandarDetail', { static: false }),
        __metadata("design:type", _callanderdetail_callandardetail_component__WEBPACK_IMPORTED_MODULE_7__["CallandardetailComponent"])
    ], CalendarListComponent.prototype, "callendarDetail", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('messageDetailsPopup', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_13__["ModalDirective"])
    ], CalendarListComponent.prototype, "attendancemodel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fullcalendar', { static: false }),
        __metadata("design:type", ng_fullcalendar__WEBPACK_IMPORTED_MODULE_5__["CalendarComponent"])
    ], CalendarListComponent.prototype, "fullcalendar", void 0);
    CalendarListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-calendarlist',
            //template: `<app-calendarlist (Onsaved)='onDialogSaved($event)'></app-calendarlist>`,
            template: __importDefault(__webpack_require__(/*! raw-loader!./calendarlist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/calendar/calendarlist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./calendarlist.component.scss */ "./src/app/views/calendar/calendarlist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_calendarlist_service__WEBPACK_IMPORTED_MODULE_8__["CalendarlistService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_12__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_9__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_11__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_11__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_10__["ToastrService"]])
    ], CalendarListComponent);
    return CalendarListComponent;
}());



/***/ }),

/***/ "./src/app/views/calendar/calendarlist.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/views/calendar/calendarlist.module.ts ***!
  \*******************************************************/
/*! exports provided: CalendarListModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalendarListModule", function() { return CalendarListModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _calendarlist_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./calendarlist-routing.module */ "./src/app/views/calendar/calendarlist-routing.module.ts");
/* harmony import */ var _calendarlist_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./calendarlist.component */ "./src/app/views/calendar/calendarlist.component.ts");
/* harmony import */ var ng_fullcalendar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ng-fullcalendar */ "./node_modules/ng-fullcalendar/fesm5/ng-fullcalendar.js");
/* harmony import */ var _makeappointment_makeappointment_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./makeappointment/makeappointment.component */ "./src/app/views/calendar/makeappointment/makeappointment.component.ts");
/* harmony import */ var _callanderdetail_callandardetail_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./callanderdetail/callandardetail.component */ "./src/app/views/calendar/callanderdetail/callandardetail.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};













var CalendarListModule = /** @class */ (function () {
    function CalendarListModule() {
    }
    CalendarListModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_calendarlist_component__WEBPACK_IMPORTED_MODULE_8__["CalendarListComponent"], _makeappointment_makeappointment_component__WEBPACK_IMPORTED_MODULE_10__["MakeappointmentComponent"], _callanderdetail_callandardetail_component__WEBPACK_IMPORTED_MODULE_11__["CallandardetailComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ng_fullcalendar__WEBPACK_IMPORTED_MODULE_9__["FullCalendarModule"],
                _calendarlist_routing_module__WEBPACK_IMPORTED_MODULE_7__["CalendarListRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["NgxDatatableModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__["ModalModule"]
            ],
            exports: [_makeappointment_makeappointment_component__WEBPACK_IMPORTED_MODULE_10__["MakeappointmentComponent"]]
        })
    ], CalendarListModule);
    return CalendarListModule;
}());



/***/ }),

/***/ "./src/app/views/calendar/callanderdetail/callandardetail.component.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/views/calendar/callanderdetail/callandardetail.component.scss ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2NhbGVuZGFyL2NhbGxhbmRlcmRldGFpbC9jYWxsYW5kYXJkZXRhaWwuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/calendar/callanderdetail/callandardetail.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/views/calendar/callanderdetail/callandardetail.component.ts ***!
  \*****************************************************************************/
/*! exports provided: CallandardetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CallandardetailComponent", function() { return CallandardetailComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _bank_bank_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../bank/bank.service */ "./src/app/views/bank/bank.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
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







var CallandardetailComponent = /** @class */ (function () {
    function CallandardetailComponent(fb, commonService, bankService, router, toaster, route) {
        this.fb = fb;
        this.commonService = commonService;
        this.bankService = bankService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.active = false;
        this.loadSave = false;
    }
    CallandardetailComponent.prototype.ngOnInit = function () {
    };
    CallandardetailComponent.prototype.close = function () {
        this.active = false;
        this.callendarDetail.hide();
    };
    CallandardetailComponent.prototype.Save = function () {
        this.callendarDetail.hide();
        this.router.navigateByUrl("/calendar");
    };
    CallandardetailComponent.prototype.show = function () {
        //this.refresh();
        this.callendarDetail.show();
        this.active = true;
    };
    CallandardetailComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _bank_bank_service__WEBPACK_IMPORTED_MODULE_4__["BankService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('callendarDetail', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__["ModalDirective"])
    ], CallandardetailComponent.prototype, "callendarDetail", void 0);
    CallandardetailComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-callandardetail',
            template: __importDefault(__webpack_require__(/*! raw-loader!./callandardetail.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/calendar/callanderdetail/callandardetail.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./callandardetail.component.scss */ "./src/app/views/calendar/callanderdetail/callandardetail.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _bank_bank_service__WEBPACK_IMPORTED_MODULE_4__["BankService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]])
    ], CallandardetailComponent);
    return CallandardetailComponent;
}());



/***/ }),

/***/ "./src/app/views/calendar/makeappointment/makeappointment.component.scss":
/*!*******************************************************************************!*\
  !*** ./src/app/views/calendar/makeappointment/makeappointment.component.scss ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL2NhbGVuZGFyL21ha2VhcHBvaW50bWVudC9tYWtlYXBwb2ludG1lbnQuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/calendar/makeappointment/makeappointment.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/views/calendar/makeappointment/makeappointment.component.ts ***!
  \*****************************************************************************/
/*! exports provided: MakeappointmentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MakeappointmentComponent", function() { return MakeappointmentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _calendarlist_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../calendarlist.service */ "./src/app/views/calendar/calendarlist.service.ts");
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








var MakeappointmentComponent = /** @class */ (function () {
    function MakeappointmentComponent(fb, commonService, calenderService, router, toaster, route) {
        this.fb = fb;
        this.commonService = commonService;
        this.calenderService = calenderService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.hideEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.loadSave = false;
        this.active = false;
        this.isDateChanged = true;
        this.appmodel = new _calendarlist_service__WEBPACK_IMPORTED_MODULE_7__["appointmentmodel"]();
        this.fTime = new Date(0);
        this.Tdate = new Date(0);
        this.minimumDate = new Date();
        this.isEdit = false;
        this.minToTime = new Date();
        this.minFromTime = new Date();
        this.comptype = '';
        this.addOrUpdatePermission = true;
        //modulePermission: ModuleList;
        this.isAdd = true;
        this.isUpdate = true;
        this.showTime = false;
        this.modulePermission = [];
        this.comptype = JSON.parse(localStorage.getItem("userinfo"));
        this.InitForm();
        //const moduleCode = this.route.snapshot.data.moduleCode;
        //this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        //let add = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'APPOINTMENTADD');
        //if (add == undefined) {
        //  add = "null";
        //} else {
        //  this.isAdd = true;
        //}
        //let update = this.modulePermission.find(m => m.privilegecode.toUpperCase() == 'APPOINTMENTUPDATE');
        //if (update == undefined) {
        //  update = "null";
        //} else {
        //  this.isUpdate = true;
        //}
    }
    ;
    ;
    MakeappointmentComponent.prototype.ngOnInit = function () {
        this.addOrUpdatePermission = true;
        this.getAppointmentType();
        this.getAppointmentWith();
        this.getAppointmentStatus();
        this.getAppointmentStatusFinancialInstitute();
        this.showTime = false;
        console.log("comptype", this.comptype);
        //this.isEdit = false;
    };
    MakeappointmentComponent.prototype.getAppointmentType = function () {
        var _this = this;
        this.commonService.getMasterItemsList('appointmenttype').subscribe(function (result) {
            _this.lstappointment = _this.commonService.masters;
        });
    };
    MakeappointmentComponent.prototype.getAppointmentStatus = function () {
        var _this = this;
        this.commonService.getMasterItemsList('appointmentstatus').subscribe(function (result) {
            _this.lstappointmentstatus = _this.commonService.masters;
        });
    };
    //lstappointmentstatusForFinancialInstitute
    MakeappointmentComponent.prototype.getAppointmentStatusFinancialInstitute = function () {
        var _this = this;
        this.commonService.getMasterItemsList('appointmentstatusForFinancialInstitute').subscribe(function (result) {
            _this.lstappointmentstatusForFinancialInstitute = _this.commonService.masters;
        });
    };
    MakeappointmentComponent.prototype.getAppointmentWith = function () {
        var _this = this;
        this.commonService.getMasterItemsList('appointmentobject').subscribe(function (result) {
            _this.appointments = _this.commonService.masters;
            if (_this.comptype.companyType == 'companytypeFinancialInstitute') {
                _this.getcustomers(1);
            }
            console.log('this.appointments', _this.appointments);
        });
    };
    MakeappointmentComponent.prototype.selectAppointmentWith = function (event) {
        var value = null;
        if (typeof event != 'undefined') {
            value = event.value;
            this.addForm.patchValue({
                customer: [null]
            });
            this.customers = [];
            this.getcustomers(value);
        }
    };
    MakeappointmentComponent.prototype.getcustomers = function (value) {
        var _this = this;
        this.calenderService.getcustomerList(value).subscribe(function (result) {
            _this.customers = result;
        });
    };
    MakeappointmentComponent.prototype.getcustomersForSelected = function (value, selected) {
        var _this = this;
        this.calenderService.getcustomerList(value.text).subscribe(function (result) {
            _this.customers = result;
            _this.addForm.patchValue({
                customer: selected
            });
        });
    };
    MakeappointmentComponent.prototype.close = function () {
        this.active = false;
        this.showTime = false;
        this.addForm.reset();
        this.modalmakeAppointment.hide();
        //debugger;
        this.hideEvent.emit();
    };
    MakeappointmentComponent.prototype.OnChanged = function (e) {
        console.log('before', e);
        this.showTime = true;
        this.isDateChanged = true;
        this.datefrommodel = e;
        e = e.getDate() + ' ' + e.getFullYear();
        console.log('e', e);
        var ab = new Date();
        var as = ab.getDate() + ' ' + ab.getFullYear();
        if (e == as) {
            this.addForm.get('toTime').setValue(null);
            this.addForm.get('fromTime').setValue(null);
            this.minFromTime = new Date();
            this.minToTime = new Date();
            this.maxToTime.setHours(ab.getHours());
            this.maxToTime.setMinutes(ab.getMinutes());
        }
        else {
            this.minFromTime = null;
            this.minToTime = null;
        }
    };
    MakeappointmentComponent.prototype.setcustomerid = function (event) {
        console.log('setcustomerid', event);
        this.customerID = event.userId;
    };
    MakeappointmentComponent.prototype.Save = function () {
        var _this = this;
        if (this.addForm.valid) {
            this.appmodel.AppointmentTypeID = this.addForm.value.appointmenttypeId;
            this.appmodel.AppointmentStatusID = this.addForm.value.appointmentstatusId;
            this.appmodel.appointmentWith = this.addForm.value.appointmentWith;
            this.appmodel.customer = this.addForm.value.customer;
            this.appmodel.CustomerID = this.customerID;
            this.appmodel.description = this.addForm.value.description;
            var dtdate = new Date(this.addForm.value.appointmentDueDate);
            this.appmodel.AppointmentDueDate = dtdate.toDateString();
            this.appmodel.FromTime = this.addForm.value.fromTime;
            this.appmodel.ToTime = this.addForm.value.toTime;
            this.fTime = new Date(this.appmodel.FromTime);
            this.Tdate = new Date(this.appmodel.ToTime);
            this.appmodel.FromTime = this.fTime.getHours() + ":" + this.fTime.getMinutes();
            this.appmodel.ToTime = this.Tdate.getHours() + ":" + this.Tdate.getMinutes();
            this.appmodel.AppointmentID = this.appId;
            this.calenderService.addeditannouncement(this.appmodel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    if (_this.routeFrom == 'Lead') {
                        _this.router.navigate(["/lead"]);
                    }
                    else if (_this.routeFrom == 'Opportunity') {
                        _this.router.navigate(["/opportunity"]);
                    }
                    else {
                        _this.router.navigate(["/calendar"]);
                    }
                    _this.hideEvent.emit('abc');
                    _this.addForm.reset();
                    _this.modalmakeAppointment.hide();
                }
                else {
                    //this.loadSave = false;
                    _this.toaster.error(result.responseMessage);
                }
            }, function (error) {
                //this.loadSave = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.addForm);
        }
    };
    MakeappointmentComponent.prototype.show = function () {
        this.title = "Add Appointment";
        this.appId = null;
        this.isAdd = true;
        this.addOrUpdatePermission = this.isAdd;
        this.modalmakeAppointment.show();
        this.active = true;
        this.isEdit = false;
    };
    MakeappointmentComponent.prototype.showComponent = function (subModuleName) {
        var _this = this;
        this.title = "Add Appointment";
        this.appId = null;
        this.isAdd = true;
        this.addOrUpdatePermission = this.isAdd;
        this.modalmakeAppointment.show();
        this.active = true;
        this.isEdit = false;
        this.routeFrom = subModuleName;
        this.commonService.getMasterItemsList('appointmentobject').subscribe(function (result) {
            _this.appointments = [];
            _this.commonService.masters.forEach(function (t) {
                if (t.text == subModuleName) {
                    _this.appointments.push(t);
                }
            });
        });
    };
    MakeappointmentComponent.prototype.edit = function (id) {
        var _this = this;
        this.title = "Edit Appointment";
        debugger;
        this.addOrUpdatePermission = this.isUpdate;
        this.appId = id;
        this.calenderService.getAppointmentById(id).subscribe(function (result) {
            console.log("result1212451", result);
            debugger;
            if (result.module_obj != null) {
                var AppointmentObject = _this.Objectunknown.items.find(function (element) {
                    if (element.value == result.module_obj == null ? null : result.module_obj.toString()) {
                        return element;
                    }
                });
            }
            var d = new Date(result.appointmentDueDate);
            var totime = new Date(result.editDateTo);
            var fromtime = new Date(result.editDateFrom);
            //const totime: Date = new Date(result.editDateTo + 'Z');
            //let fromtime = (result.editDateFrom == null ? null : new Date(result.editDateFrom + 'Z'));
            _this.showTime = true;
            _this.isDateChanged = false;
            _this.addForm.patchValue({
                appointmentId: id,
                appointmenttypeId: result.appointmentTypeID,
                appointmentstatusId: result.appointmentStatusID == null ? result.appointmentStatusID : result.appointmentStatusID.toString(),
                appointmentWith: result.module_obj == null ? null : result.module_obj.toString(),
                customer: result.contact_Id,
                description: result.description,
                appointmentDueDate: d,
                toTime: totime,
                fromTime: fromtime,
            });
            _this.isEdit = true;
            if (result.module_obj != null) {
                _this.getcustomersForSelected(_this.Objectunknown.items.find(function (element) {
                    if (element.value == result.module_obj.toString()) {
                        return element.text;
                    }
                }), result.contact_Id);
                _this.getcustomers(result.module_obj.toString());
            }
            debugger;
            _this.modalmakeAppointment.show();
        });
    };
    MakeappointmentComponent.prototype.InitForm = function () {
        this.addForm = this.fb.group({
            appointmenttypeId: [null, this.comptype.companyType != 'companytypeFinancialInstitute' ? _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            appointmentstatusId: [null],
            appointmentDueDate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            fromTime: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            toTime: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            customer: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            appointmentWith: [null, this.comptype.companyType != 'companytypeFinancialInstitute' ? _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].nullValidator],
            description: null,
            appointmentId: '',
        });
    };
    Object.defineProperty(MakeappointmentComponent.prototype, "appointmentId", {
        get: function () { return this.addForm.get('appointmentId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MakeappointmentComponent.prototype, "appointmenttypeId", {
        get: function () { return this.addForm.get('appointmenttypeId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MakeappointmentComponent.prototype, "appointmentstatusId", {
        get: function () { return this.addForm.get('appointmentstatusId'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MakeappointmentComponent.prototype, "appointmentDueDate", {
        get: function () { return this.addForm.get('appointmentDueDate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MakeappointmentComponent.prototype, "fromTime", {
        get: function () { return this.addForm.get('fromTime'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MakeappointmentComponent.prototype, "toTime", {
        get: function () { return this.addForm.get('toTime'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MakeappointmentComponent.prototype, "appointmentWith", {
        get: function () { return this.addForm.get('appointmentWith'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MakeappointmentComponent.prototype, "customer", {
        get: function () { return this.addForm.get('customer'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MakeappointmentComponent.prototype, "description", {
        get: function () { return this.addForm.get('description'); },
        enumerable: true,
        configurable: true
    });
    MakeappointmentComponent.prototype.changeToValue = function (evt) {
        // this.minFromTime = new Date();    
        //this.minToTime = evt;
        //this.todate = evt;
        //this.maxToTime = new Date();
        debugger;
        console.log('evt', evt);
        var as = evt.getDay() + ' ' + evt.getMonth() + ' ' + evt.getFullYear();
        var ab = this.datefrommodel.getDay() + ' ' + this.datefrommodel.getMonth() + ' ' + this.datefrommodel.getFullYear();
        console.log('as', as);
        console.log('this.todate', this.todate);
        if (ab == as) {
            if (this.todate > this.datefrommodel) {
                this.addForm.get('fromTime').setValue(null);
            }
        }
        //this.maxToTime.setHours(23);
        //this.maxToTime.setMinutes(59);
        if (this.todate != undefined || this.todate != null) {
            if (this.todate < evt) {
                this.addForm.get('fromTime').setValue(null);
                this.toaster.error('You can not select From time after To Time');
            }
        }
    };
    MakeappointmentComponent.prototype.changeTotimeValue = function (evt) {
        console.log('FromTimemodel', this.FromTimemodel);
        console.log('evt', evt);
        var as = evt.getDay() + ' ' + evt.getMonth() + ' ' + evt.getFullYear();
        var ab = this.datefrommodel.getDay() + ' ' + this.datefrommodel.getMonth() + ' ' + this.datefrommodel.getFullYear();
        console.log('as', as);
        console.log('ab', ab);
        if (ab == as) {
            if (this.FromTimemodel < this.datefrommodel) {
                this.addForm.get('toTime').setValue(null);
            }
        }
        if (this.FromTimemodel != undefined || this.FromTimemodel != null) {
            if (this.FromTimemodel > evt) {
                this.addForm.get('toTime').setValue(null);
                this.toaster.error('You can not select To time before From Time');
            }
        }
    };
    MakeappointmentComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _calendarlist_service__WEBPACK_IMPORTED_MODULE_7__["CalendarlistService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('makeappointment', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], MakeappointmentComponent.prototype, "modalmakeAppointment", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('clearDrop', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__["NgSelectComponent"])
    ], MakeappointmentComponent.prototype, "clearDrop", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('clearAppointment', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__["NgSelectComponent"])
    ], MakeappointmentComponent.prototype, "Objectunknown", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])('Onsaved'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], MakeappointmentComponent.prototype, "hideEvent", void 0);
    MakeappointmentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-makeappointment',
            template: __importDefault(__webpack_require__(/*! raw-loader!./makeappointment.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/calendar/makeappointment/makeappointment.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./makeappointment.component.scss */ "./src/app/views/calendar/makeappointment/makeappointment.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _calendarlist_service__WEBPACK_IMPORTED_MODULE_7__["CalendarlistService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], MakeappointmentComponent);
    return MakeappointmentComponent;
}());



/***/ })

}]);
//# sourceMappingURL=default~views-calendar-calendarlist-module~views-lead-lead-module~views-opportunity-opportunity-modu~b75b56f4.js.map