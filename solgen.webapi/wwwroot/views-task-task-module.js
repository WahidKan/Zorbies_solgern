(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-task-task-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/task/addedittask.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/task/addedittask.component.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{Heading}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li>\r\n        <a routerLink=\"/task\">Tasks</a>\r\n      </li>\r\n      <li class=\"active\">{{breadcrum}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \">\r\n    <form [formGroup]=\"addForm\" (ngSubmit)=\"addTask()\">\r\n      <div class=\"bank-box\">\r\n        <div class=\"row\">\r\n          <div class=\"col-12 col-md-6 col-lg-4\">\r\n            <label>New Task:*<span class=\"text-danger\"></span></label>\r\n            <div class=\"form-group\">\r\n              <input type=\"text\" class=\"form-control\" formControlName=\"newTask\" maxlength=\"50\" placeholder=\"Enter new task\"\r\n                     [ngClass]=\"{'is-invalid': (newTask.invalid && (newTask.dirty || newTask.touched) &&\r\n                               (newTask.errors?.required || newTask.errors?.maxlength)) }\">\r\n              <small *ngIf=\"newTask.invalid && (newTask.dirty || newTask.touched) && newTask.errors?.required\"\r\n                     class=\"text-danger\"> Task is required</small>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-12 col-md-6 col-lg-4\">\r\n            <label>Due Date:*<span class=\"text-danger\"></span></label>\r\n            <div class=\"form-group\">\r\n              <p-calendar formControlName=\"dueDate\" placeholder=\"Select Due Date\"\r\n                          [showTime]=\"false\"\r\n                          dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\"\r\n                          [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n                          [ngClass]=\"{'is-invalid': (dueDate.invalid && (dueDate.dirty || dueDate.touched) &&\r\n                        (dueDate.errors?.required || dueDate.errors?.maxlength)) }\"> </p-calendar>\r\n              <small *ngIf=\"dueDate.invalid && (dueDate.dirty || dueDate.touched) && dueDate.errors?.required\"\r\n                     class=\"text-danger\"> Date is required</small>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"col-12 col-md-6 col-lg-4\">\r\n            <label>Due Time:*<span class=\"text-danger\"></span></label>\r\n            <div class=\"form-group\">\r\n              <p-calendar inputStyleClass=\"form-control start-date\"\r\n                          formControlName=\"dueTime\" placeholder=\"Select Due Time\"\r\n                          [timeOnly]=\"true\" inputId=\"timeonly\"\r\n                          [ngClass]=\"{'is-invalid': (dueTime.invalid && (dueTime.dirty || dueTime.touched) &&\r\n                        (dueTime.errors?.required || dueTime.errors?.maxlength)) }\"> </p-calendar>\r\n              <small *ngIf=\"dueTime.invalid && (dueTime.dirty || dueTime.touched) && dueTime.errors?.required\"\r\n                     class=\"text-danger\">Time  is required</small>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-12 col-md-6 col-lg-4\">\r\n            <label>Assigned User:*<span class=\"text-danger\"></span></label>\r\n            <div class=\"form-group\">\r\n              <ng-select #clearDrop [items]=\"lstActiveStatus\"\r\n                         placeholder=\"Select Assigned User\"\r\n                         formControlName=\"assignedUser\"\r\n                         bindValue=\"value\" bindLabel=\"text\"\r\n                         [closeOnSelect]=\"true\"\r\n                         [ngClass]=\"{'is-invalid': (assignedUser.invalid && (assignedUser.dirty || assignedUser.touched) &&\r\n                        (assignedUser.errors?.required || assignedUser.errors?.maxlength)) }\"> </ng-select>\r\n              <small *ngIf=\"assignedUser.invalid && (assignedUser.dirty || assignedUser.touched) && assignedUser.errors?.required\"\r\n                     class=\"text-danger\"> User  is required</small>\r\n              <!--<select >\r\n        <option value=\"volvo\">Hector Campus</option>\r\n        <option value=\"saab\">vinny Vek</option>\r\n\r\n      </select>-->\r\n            </div>\r\n          </div>\r\n          <div class=\"col-12 col-md-6 col-lg-4\">\r\n            <label>Status:*<span class=\"text-danger\"></span></label>\r\n            <div class=\"form-group\">\r\n              <ng-select #clearDrop [items]=\"lstStatus\"\r\n                         formControlName=\"status\"\r\n                         styleClass=\"prime-slider-override form-control\"\r\n                         placeholder=\"Select Status\" bindValue=\"value\" bindLabel=\"text\"\r\n                         [closeOnSelect]=\"true\"\r\n                         [ngClass]=\"{'is-invalid': (status.invalid && (status.dirty || status.touched) &&\r\n                          (status.errors?.required || status.errors?.maxlength)) }\"> </ng-select>\r\n              <small *ngIf=\"status.invalid && (status.dirty || status.touched) && status.errors?.required\"\r\n                     class=\"text-danger\"> Status  is required</small>\r\n              <!--<select >\r\n        <option value=\"volvo\">Hector Campus</option>\r\n        <option value=\"saab\">vinny Vek</option>\r\n\r\n      </select>-->\r\n            </div>\r\n          </div>\r\n          <div class=\"col-12 col-md-6 col-lg-2\">\r\n            <div class=\"form-group\">\r\n              <label>Send Email:</label>\r\n              <div class=\"form-control border-0 px-0\">\r\n                <label class=\"switch\">\r\n                  <input type=\"checkbox\" checked=\"\" id=\"address\" formControlName=\"sendEmail\">\r\n                  <span class=\"slider round\"><span>Yes</span></span>\r\n                </label>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-12 col-md-6 col-lg-2\">\r\n            <label>Send SMS:</label>\r\n            <div class=\"form-control border-0 px-0\">\r\n              <label class=\"switch\">\r\n                <input type=\"checkbox\" checked=\"\" id=\"zipCode\" formControlName=\"sendSms\">\r\n                <span class=\"slider round\"><span>Yes</span></span>\r\n              </label>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-12 col-md-12 col-lg-12 mb-3\">\r\n            <a *ngIf='addOrUpdatePermission' href=\"javascript:void(0);\" type=\"submit\" class=\"btn btn-success mr-2\" (click)=\"addTask()\">\r\n\r\n              <i class=\"fa fa-save\"></i> Submit\r\n            </a>\r\n            <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"Cancel()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n          </div>\r\n        </div>\r\n\r\n      </div>\r\n    </form>\r\n\r\n  </div>\r\n\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/task/tasklist.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/task/tasklist.component.html ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Breadcrumb-->\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Tasks</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Tasks</li>\r\n    </ol>\r\n  </div>\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3\">\r\n        <div class=\"row mt-2\">\r\n\r\n          <div class=\"col-md-6\">\r\n            <div class=\"row searchfield  mr-1 w-100\">\r\n              <div class=\"col-md-4 float-left\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-md-8 float-left\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\"><span><i class=\"fa fa-search\"></i> Search</span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\"><span><i class=\"fa fa-refresh\"></i> Reset</span></a>\r\n                <a class=\"btn btn-white mr-1\" href=\"javascript:void(0);\" (click)=\"popUpOpen()\"><span><i class=\"fa fa-filter\"></i> Filter</span></a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-6\">\r\n            <div class=\"dt-buttons\">\r\n              <a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" ><span><i class=\"fa fa-list-alt\"></i> Manage View</span></a>\r\n              <a *ngIf='modulePermission!==null && modulePermission.roleModuleAddFlag' [routerLink]=\"['/task/addtask']\" class=\"btn btn-success form-btns  mr-1\"><i class=\"fa fa-plus\"></i> Add Task</a>\r\n              <a *ngIf='modulePermission!==null && modulePermission.roleModuleDeleteFlag' class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\"><span><i class=\"fa fa-trash\"></i> Delete</span></a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div><!--[rowHeight]=\"'auto'\"  -->\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <div class=\"table table-striped\">\r\n          <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                         [rows]=\"pagedData.data\"\r\n                         [columnMode]=\"'force'\"\r\n                         [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                         [headerHeight]=\"40\"\r\n                         [footerHeight]=\"40\"\r\n                         \r\n                         [externalPaging]=\"true\"\r\n                         [externalSorting]=\"true\"\r\n                         [loadingIndicator]=\"loadSave\"\r\n                         [count]=\"pagedData.pager.totalItems\"\r\n                         [offset]=\"pagedData.pager.currentPage\"\r\n                         [limit]=\"pagedData.pager.pageSize\"\r\n                         (page)='setPage($event)'\r\n                         (sort)=\"onSort($event)\">\r\n\r\n\r\n            <ngx-datatable-column name=\"Task ID\" prop=\"TaskId\" [sortable]=\"true\">\r\n              bl\r\n\r\n\r\n              <!--<ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n          <a [routerLink]=\"['/loanApplication/Detail']\">{{row.TaskId}} </a>\r\n        </ng-template>-->\r\n            </ngx-datatable-column>\r\n\r\n\r\n            <ngx-datatable-column name=\"Status\" prop=\"Status\" [sortable]=\"true\"> </ngx-datatable-column>\r\n\r\n\r\n            <ngx-datatable-column name=\"Assigned User\" prop=\"AssignedUser\" [sortable]=\"true\"></ngx-datatable-column>\r\n            <!--<ngx-datatable-column name=\"Customer\" prop=\"Customer\" [sortable]=\"true\"></ngx-datatable-column>\r\n      <ngx-datatable-column name=\"Creator\" prop=\"Creator\" [sortable]=\"true\"></ngx-datatable-column>-->\r\n            <ngx-datatable-column name=\"Task\" prop=\"Task\" [sortable]=\"true\"></ngx-datatable-column>\r\n            <ngx-datatable-column name=\"Due Date\" prop=\"DueDate\" [sortable]=\"true\"></ngx-datatable-column>\r\n            <ngx-datatable-column [width]=\"80\" name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n              <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                <div class=\"text-center\">\r\n                  <a *ngIf='modulePermission!==null && modulePermission.roleModuleReadFlag' href=\"javascript:void(0);\" class=\"btn-edit icon-text-center\"><i (click)=\"onOpenEdit(row.TaskAutoId)\" title=\"Click to edit.\" class=\"fa fa-edit text-success\"></i></a>\r\n                  &nbsp;\r\n                  <a *ngIf='modulePermission!==null && modulePermission.roleModuleDeleteFlag' href=\"javascript:void(0);\" class=\"text-danger icon_tick mx-1\"><i (click)=\"onDeleteTask(row.TaskAutoId)\" title=\"Click to delete.\" class=\"fa fa-trash\"></i></a>\r\n                </div>\r\n\r\n              </ng-template>\r\n            </ngx-datatable-column>\r\n            <ngx-datatable-footer>\r\n              <ng-template ngx-datatable-footer-template\r\n                           let-rowCount=\"rowCount\"\r\n                           let-pageSize=\"pageSize\"\r\n                           let-selectedCount=\"selectedCount\"\r\n                           let-currentPage=\"currentPage\"\r\n                           let-offset=\"offset\"\r\n                           let-isVisible=\"isVisible\">\r\n                <div class=\"page-count\">\r\n                  {{rowCount}} total\r\n                </div>\r\n                <div>\r\n                  <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                    <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                      <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                 bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                    </span>\r\n                  </div>\r\n                </div>\r\n                <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                 [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                 [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                 [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                 [page]=\"pagedData.pager.currentPage+1\"\r\n                                 [size]=\"pageSizeValue\"\r\n                                 [count]=\"pagedData.pager.totalItems\"\r\n                                 [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                 (change)=\"setPage($event)\">\r\n                </datatable-pager>\r\n              </ng-template>\r\n            </ngx-datatable-footer>\r\n          </ngx-datatable>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

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

/***/ "./src/app/views/task/addedittask.component.scss":
/*!*******************************************************!*\
  !*** ./src/app/views/task/addedittask.component.scss ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3Rhc2svYWRkZWRpdHRhc2suY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/task/addedittask.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/views/task/addedittask.component.ts ***!
  \*****************************************************/
/*! exports provided: AddedittaskComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddedittaskComponent", function() { return AddedittaskComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _bank_bank_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../bank/bank.service */ "./src/app/views/bank/bank.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _tasklist_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tasklist.service */ "./src/app/views/task/tasklist.service.ts");
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








var AddedittaskComponent = /** @class */ (function () {
    function AddedittaskComponent(fb, commonService, bankService, router, toaster, route, taskListService) {
        this.fb = fb;
        this.commonService = commonService;
        this.bankService = bankService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.taskListService = taskListService;
        this.taskmodel = new _tasklist_service__WEBPACK_IMPORTED_MODULE_7__["Task"]();
        this.userId = null;
        this.dateTime = new Date();
        this.Heading = 'Add Task';
        this.breadcrum = 'Add Task';
        this.loadSave = false;
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
    }
    AddedittaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.addOrUpdatePermission = false;
        this.initForm();
        this.route.queryParams.subscribe(function (params) {
            // console.log(params.id);
            _this.userId = params.id;
            if (_this.userId) {
                _this.getTaskDetails(params.id);
            }
            else {
                _this.addOrUpdatePermission = _this.modulePermission.roleModuleAddFlag;
            }
        });
        this.taskListService.GetAssignedUsers().subscribe(function (result) {
            _this.lstActiveStatus = result;
        });
        this.activeStatus = '';
        this.commonService.getMasterItemsList("TaskStatus").subscribe(function (result) {
            // console.log("data", result);
            // console.log("data", this.commonService.masters);
            _this.lstStatus = _this.commonService.masters;
        });
    };
    AddedittaskComponent.prototype.getTaskDetails = function (id) {
        var _this = this;
        this.addOrUpdatePermission = this.modulePermission.roleModuleUpdateFlag;
        this.taskListService.GetTaskDetails(id + "").subscribe(function (s) {
            _this.dt = new Date();
            var splitted = s.result.dueTime.split(":");
            _this.dt.setHours(splitted[0]);
            _this.dt.setMinutes(splitted[1]);
            // console.log(this.dt);
            _this.breadcrum = 'Edit User: ' + s.result.newTask;
            _this.Heading = 'Edit Task';
            _this.addForm.patchValue({
                newTask: s.result.newTask,
                assignedUser: s.result.assignedUser,
                sendEmail: s.result.sendEmail,
                sendSms: s.result.sendSms,
                status: s.result.status,
                dueTime: _this.dt,
                dueDate: new Date(s.result.dueDate)
            });
        });
    };
    AddedittaskComponent.prototype.addTask = function () {
        var _this = this;
        if (this.addForm.valid) {
            this.taskmodel.AssignedUser = this.addForm.value.assignedUser;
            this.taskmodel.DueDate = new Date(this.addForm.value.dueDate);
            this.taskmodel.DueTime = this.addForm.value.dueTime;
            this.taskmodel.NewTask = this.addForm.value.newTask;
            this.taskmodel.SendEmail = this.addForm.value.sendEmail;
            this.taskmodel.SendSms = this.addForm.value.sendSms;
            this.taskmodel.Status = this.addForm.value.status;
            this.taskmodel.userId = '';
            this.dt = new Date(this.taskmodel.DueTime);
            this.taskmodel.DueTime = this.dt.getHours() + ":" + this.dt.getMinutes();
            this.taskmodel.taskAutoid = this.userId;
            this.taskListService.UploadTaskData(this.taskmodel).subscribe(function (result) {
                _this.toaster.success("Task has been  successfully Submitted..");
                _this.router.navigateByUrl("/task");
            });
        }
        else {
            this.commonService.validateAllFormFields(this.addForm);
        }
        //this.taskmodel.addeditInsurance(this.insuranceModel).subscribe((result: any) => {
        //  if (result.statusCode == 200) {
        //    this.toaster.success(result.responseMessage);
        //    this.router.navigateByUrl("/insurance");
        //    setTimeout(() => { this.loadSave = false; }, 3000);
        //  }
        //  else {
        //    this.loadSave = false;
        //    this.toaster.error(result.responseMessage);
        //  }
        //}, error => {
        //  this.loadSave = false;
        //});
        //}
        //this.router.navigateByUrl("/task");
    };
    AddedittaskComponent.prototype.Cancel = function () {
        this.router.navigateByUrl("/task");
    };
    AddedittaskComponent.prototype.initForm = function () {
        this.addForm = this.fb.group({
            newTask: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            dueDate: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            dueTime: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            assignedUser: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]],
            sendEmail: [false],
            sendSms: [false],
            status: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
        });
    };
    Object.defineProperty(AddedittaskComponent.prototype, "newTask", {
        get: function () { return this.addForm.get('newTask'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddedittaskComponent.prototype, "dueDate", {
        get: function () { return this.addForm.get('dueDate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddedittaskComponent.prototype, "dueTime", {
        get: function () { return this.addForm.get('dueTime'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddedittaskComponent.prototype, "assignedUser", {
        get: function () { return this.addForm.get('assignedUser'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddedittaskComponent.prototype, "sendEmail", {
        get: function () { return this.addForm.get('sendEmail'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddedittaskComponent.prototype, "sendSms", {
        get: function () { return this.addForm.get('sendSms'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddedittaskComponent.prototype, "status", {
        get: function () { return this.addForm.get('status'); },
        enumerable: true,
        configurable: true
    });
    AddedittaskComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _bank_bank_service__WEBPACK_IMPORTED_MODULE_4__["BankService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _tasklist_service__WEBPACK_IMPORTED_MODULE_7__["TasklistService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('clearDrop', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_6__["NgSelectComponent"])
    ], AddedittaskComponent.prototype, "clearDrop", void 0);
    AddedittaskComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addedittask',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addedittask.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/task/addedittask.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./addedittask.component.scss */ "./src/app/views/task/addedittask.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _bank_bank_service__WEBPACK_IMPORTED_MODULE_4__["BankService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"], _tasklist_service__WEBPACK_IMPORTED_MODULE_7__["TasklistService"]])
    ], AddedittaskComponent);
    return AddedittaskComponent;
}());



/***/ }),

/***/ "./src/app/views/task/task-routing.module.ts":
/*!***************************************************!*\
  !*** ./src/app/views/task/task-routing.module.ts ***!
  \***************************************************/
/*! exports provided: TaskRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskRoutingModule", function() { return TaskRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _tasklist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasklist.component */ "./src/app/views/task/tasklist.component.ts");
/* harmony import */ var _addedittask_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addedittask.component */ "./src/app/views/task/addedittask.component.ts");
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
    { path: '', component: _tasklist_component__WEBPACK_IMPORTED_MODULE_2__["TasklistComponent"] },
    { path: 'addtask', component: _addedittask_component__WEBPACK_IMPORTED_MODULE_3__["AddedittaskComponent"] }
];
var TaskRoutingModule = /** @class */ (function () {
    function TaskRoutingModule() {
    }
    TaskRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], TaskRoutingModule);
    return TaskRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/task/task.module.ts":
/*!*******************************************!*\
  !*** ./src/app/views/task/task.module.ts ***!
  \*******************************************/
/*! exports provided: TaskModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TaskModule", function() { return TaskModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _tasklist_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tasklist.component */ "./src/app/views/task/tasklist.component.ts");
/* harmony import */ var _task_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./task-routing.module */ "./src/app/views/task/task-routing.module.ts");
/* harmony import */ var _addedittask_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./addedittask.component */ "./src/app/views/task/addedittask.component.ts");
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





var TaskModule = /** @class */ (function () {
    function TaskModule() {
    }
    TaskModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_tasklist_component__WEBPACK_IMPORTED_MODULE_7__["TasklistComponent"], _addedittask_component__WEBPACK_IMPORTED_MODULE_9__["AddedittaskComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _task_routing_module__WEBPACK_IMPORTED_MODULE_8__["TaskRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["NgxDatatableModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__["ModalModule"]
            ]
        })
    ], TaskModule);
    return TaskModule;
}());



/***/ }),

/***/ "./src/app/views/task/tasklist.component.scss":
/*!****************************************************!*\
  !*** ./src/app/views/task/tasklist.component.scss ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3Rhc2svdGFza2xpc3QuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/task/tasklist.component.ts":
/*!**************************************************!*\
  !*** ./src/app/views/task/tasklist.component.ts ***!
  \**************************************************/
/*! exports provided: TasklistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TasklistComponent", function() { return TasklistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _tasklist_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasklist.service */ "./src/app/views/task/tasklist.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
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






var TasklistComponent = /** @class */ (function () {
    function TasklistComponent(tasklistService, dialogService, commonService, router, activeRoute, toaster) {
        var _this = this;
        this.tasklistService = tasklistService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.loadSave = false;
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
        this.commonService.getMasterItemsList("usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermission(moduleCode);
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    TasklistComponent.prototype.onOpenEdit = function (id) {
        this.router.navigate(['/task/addtask'], { queryParams: { id: id } });
    };
    TasklistComponent.prototype.onDeleteTask = function (taskId) {
        var _this = this;
        var message = "Are you sure you want to delete Task?";
        this.dialogService.confirm('Delete Loanterm', message).subscribe(function (confirmed) {
            _this.tasklistService.onDeleteTask(taskId).subscribe(function (res) {
                _this.toaster.success("Task has been deleted successfully..");
                _this.refresh();
            });
        });
    };
    TasklistComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 10;
        this.getPageSizes();
        this.refresh();
    };
    TasklistComponent.prototype.setPage = function (e) {
        this.refresh(e.page - 1);
    };
    TasklistComponent.prototype.refresh = function (pagenum) {
        var _this = this;
        if (pagenum === void 0) { pagenum = 0; }
        this.loading = true;
        // console.log(pagenum);
        this.tasklistService.GetTaskList(this.listFilter, this.searchUserType, this.sortColumn, this.sortDir, pagenum, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.tasklistService.pagedData;
            _this.loading = false;
        }, function (error) {
            _this.loading = false;
        });
    };
    TasklistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    TasklistComponent.prototype.reset = function () {
        this.listFilter = '';
        this.refresh();
    };
    TasklistComponent.prototype.search = function () {
    };
    TasklistComponent.prototype.updateFilter = function (e) {
    };
    TasklistComponent.prototype.onSort = function (e) {
    };
    TasklistComponent.prototype.popUpOpen = function () {
    };
    TasklistComponent.ctorParameters = function () { return [
        { type: _tasklist_service__WEBPACK_IMPORTED_MODULE_1__["TasklistService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
    ]; };
    TasklistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tasklist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./tasklist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/task/tasklist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./tasklist.component.scss */ "./src/app/views/task/tasklist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_tasklist_service__WEBPACK_IMPORTED_MODULE_1__["TasklistService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_2__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
    ], TasklistComponent);
    return TasklistComponent;
}());



/***/ }),

/***/ "./src/app/views/task/tasklist.service.ts":
/*!************************************************!*\
  !*** ./src/app/views/task/tasklist.service.ts ***!
  \************************************************/
/*! exports provided: TasklistService, Task */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TasklistService", function() { return TasklistService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Task", function() { return Task; });
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




var TasklistService = /** @class */ (function () {
    function TasklistService(http) {
        this.http = http;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].WebApiBaseUrl;
    }
    TasklistService.prototype.GetTaskList = function (name, userType, sortColumn, sortDir, page, pageSize, userId) {
        var _this = this;
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.baseUri + "Bank/GetTaskList?name=" + name + "&userType=" + userType + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize + "&userId=" + userId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    TasklistService.prototype.GetTaskDetails = function (taskId) {
        return this.http.get(this.baseUri + "Task/GetSingleTask?taskID=" + taskId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            return response;
        }));
    };
    TasklistService.prototype.onDeleteTask = function (taskId) {
        return this.http.get(this.baseUri + "Task/DeleteTask?taskID=" + taskId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            return true;
        }));
    };
    TasklistService.prototype.UploadTaskData = function (task) {
        // console.log('task', task);
        return this.http.post(this.baseUri + "Task/AddEditTask", task);
    };
    TasklistService.prototype.GetAssignedUsers = function () {
        var _this = this;
        return this.http.get(this.baseUri + "Task/TaskGetAssignedUsers")
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedData = response;
            return response;
        }));
    };
    TasklistService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    TasklistService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], TasklistService);
    return TasklistService;
}());

var Task = /** @class */ (function () {
    function Task() {
        this.NewTask = '';
        this.DueDate = new Date();
        this.DueTime = '';
        this.AssignedUser = '';
        this.SendEmail = false;
        this.SendSms = false;
        this.Status = '';
        this.taskAutoid = null;
        this.userId = null;
    }
    return Task;
}());



/***/ })

}]);
//# sourceMappingURL=views-task-task-module.js.map