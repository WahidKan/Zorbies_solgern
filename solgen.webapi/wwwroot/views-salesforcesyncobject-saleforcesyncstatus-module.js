(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-salesforcesyncobject-saleforcesyncstatus-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/salesforcesyncobject/saleforcesyncstatuslist.component.html":
/*!*************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/salesforcesyncobject/saleforcesyncstatuslist.component.html ***!
  \*************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Salesforce Sync Status</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Salesforce Sync Status</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3 btn-iconres\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12\">\r\n            <div class=\"row searchfield\">\r\n              <div class=\"col-md-9\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-md-7\">\r\n                    <div class=\"row px-0 pl-md-3\">\r\n                      <div class=\"col-lg-4 float-left mb-lg-0 mb-2 px-0 pr-md-3\">\r\n                        <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='objectNameFilter' placeholder=\"Object Name\" (keyup)='updateObjectNameFilter($event)'>\r\n                      </div>\r\n                      <div class=\"col-lg-4 float-left mb-lg-0 mb-2 px-0 pr-md-3\">\r\n                        <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Name\" (keyup)='updateFilter($event)'>\r\n                      </div>\r\n                      <div class=\"col-lg-4 float-left mb-lg-0 mb-2 px-0 pr-md-3\">\r\n                        <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='CreatedByFilter' placeholder=\"Created By\" (keyup)='updateCreatedByFilter($event)'>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                  <div class=\"col-md-5\">\r\n                    <div class=\"row\">\r\n                      <div class=\"col-lg-6 float-left mb-lg-0 mb-2 px-0 pr-md-3\">\r\n                        <p-calendar class=\"calendarwidth\" [showIcon]=\"true\" [(ngModel)]=\"startDate\" inputStyleClass=\"form-control start-date\" placeholder=\"Created From\" dateFormat=\"mm/dd/yy\" yearRange=\"2000:2030\" [minDate]=\"minimumDate\" [monthNavigator]=\"true\" [yearNavigator]=\"true\"></p-calendar>\r\n                      </div>\r\n                      <div class=\"col-lg-6 float-left mb-lg-0 mb-2 px-0 pr-md-3\">\r\n                        <p-calendar class=\"calendarwidth\" [showIcon]=\"true\" [(ngModel)]=\"endDate\" inputStyleClass=\"form-control start-date\" placeholder=\"Created To\" dateFormat=\"mm/dd/yy\" yearRange=\"2000:2030\" [monthNavigator]=\"true\" [yearNavigator]=\"true\"></p-calendar>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-lg-3 float-left pl-3 pl-lg-0\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i> </span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i> </span></a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                       [rows]=\"pagedData.data\"\r\n                       [columnMode]=\"'force'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"pagedData.pager.totalItems\"\r\n                       [offset]=\"pagedData.pager.currentPage+1\"\r\n                       [limit]=\"pagedData.pager.pageSize\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                       [selectAllRowsOnPage]=\"false\"\r\n                       [selected]=\"selected\"\r\n                       (select)=\"onSelect($event)\">\r\n          <ngx-datatable-column name=\"Object Name\" prop=\"ObjectName\" [sortable]=\"true\"></ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Name\" prop=\"ObjectRefName\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div title=\"{{row.ObjectRefName}}\" *ngIf=\"row.ObjectName== 'Service Appointment' || row.ObjectName== 'Attachment (Service Appointment)' || row.ObjectName== 'Note (Service Appointment)'\">\r\n                <a class=\" view-list\" [routerLink]=\"['/serviceappointment/view',row.ObjectId]\" href=\"javascript:void(0);\" [title]=\"row.ObjectRefName\">{{row.ObjectRefName| truncate : 50 }}</a>\r\n              </div>\r\n              <div title=\"{{row.ObjectRefName}}\" *ngIf=\"row.ObjectName== 'Opportunity' || row.ObjectName== 'Attachment (Opportunity)' || row.ObjectName== 'Note (Opportunity)'\">\r\n                <a class=\" view-list\" [routerLink]=\"['/opportunity/viewOpportunity',row.ObjectId]\" href=\"javascript:void(0);\" [title]=\"row.ObjectRefName\">{{row.ObjectRefName| truncate : 50 }}</a>\r\n              </div>\r\n              <div title=\"{{row.ObjectRefName}}\" *ngIf=\"companyType == 'companytypeSolarInstall' && (row.ObjectName== 'Leads' || row.ObjectName== 'Attachment (Lead)' || row.ObjectName== 'Note (Lead)')\">\r\n                <a class=\" view-list\" [routerLink]=\"['/lead/view',row.ObjectId]\" href=\"javascript:void(0);\" [title]=\"row.ObjectRefName\">{{row.ObjectRefName| truncate : 50 }}</a>\r\n              </div>\r\n              <div title=\"{{row.ObjectRefName}}\" *ngIf=\"companyType != 'companytypeSolarInstall' && (row.ObjectName== 'Leads' || row.ObjectName== 'Attachment (Lead)' || row.ObjectName== 'Note (Lead)')\">\r\n                <a class=\" view-list\" [routerLink]=\"['/lead/viewlead',row.ObjectId]\" href=\"javascript:void(0);\" [title]=\"row.ObjectRefName\">{{row.ObjectRefName| truncate : 50 }}</a>\r\n              </div>\r\n              <div title=\"{{row.ObjectRefName}}\" *ngIf=\"companyType == 'companytypeSolarInstall' && (row.ObjectName== 'Accounts' || row.ObjectName== 'Attachment (Account)' || row.ObjectName== 'Note (Account)')\">\r\n                <a class=\" view-list\" [routerLink]=\"['/accountslist/view',row.ObjectId]\" href=\"javascript:void(0);\" [title]=\"row.ObjectRefName\">{{row.ObjectRefName| truncate : 50 }}</a>\r\n              </div>\r\n              <div title=\"{{row.ObjectRefName}}\" *ngIf=\"companyType != 'companytypeSolarInstall' && (row.ObjectName== 'Accounts' || row.ObjectName== 'Attachment (Account)' || row.ObjectName== 'Note (Account)')\">\r\n                <a class=\" view-list\" [routerLink]=\"['/accountslist/viewaccount',row.ObjectId]\" href=\"javascript:void(0);\" [title]=\"row.ObjectRefName\">{{row.ObjectRefName| truncate : 50 }}</a>\r\n              </div>\r\n              <div title=\"{{row.ObjectRefName}}\" *ngIf=\"row.ObjectName== 'Contacts' || row.ObjectName== 'Attachment (Contact)' || row.ObjectName== 'Note (Contact)'\">\r\n                <a class=\" view-list\" [routerLink]=\"['/contactlist/view/',row.ObjectId]\" href=\"javascript:void(0);\" [title]=\"row.ObjectRefName\">{{row.ObjectRefName| truncate : 50 }}</a>\r\n              </div>\r\n              <div title=\"{{row.ObjectRefName}}\" *ngIf=\"row.ObjectName== 'Proposal' || row.ObjectName== 'Attachment (Proposal)' || row.ObjectName== 'Note (Proposal)'\">\r\n                <a class=\" view-list\" [routerLink]=\"['/proposal-list/viewproposal/',row.ObjectId]\" href=\"javascript:void(0);\" [title]=\"row.ObjectRefName\">{{row.ObjectRefName| truncate : 50 }}</a>\r\n              </div>\r\n              <div title=\"{{row.ObjectRefName}}\" *ngIf=\"row.ObjectName== 'Workorder' || row.ObjectName== 'Attachment (Work Order)' || row.ObjectName== 'Note (Work Order)'\">\r\n                <a class=\" view-list\" [routerLink]=\"['/workorder/view/',row.ObjectId]\" href=\"javascript:void(0);\" [title]=\"row.ObjectRefName\">{{row.ObjectRefName| truncate : 50 }}</a>\r\n              </div>\r\n              <div title=\"{{row.ObjectRefName}}\" *ngIf=\"row.ObjectName== 'Contract' || row.ObjectName== 'Attachment (Contract)' || row.ObjectName== 'Note (Contract)'\">\r\n                <a class=\" view-list\" [routerLink]=\"['/contract/view/',row.ObjectId]\" href=\"javascript:void(0);\" [title]=\"row.ObjectRefName\">{{row.ObjectRefName| truncate : 50 }}</a>\r\n              </div>\r\n              <div title=\"{{row.ObjectRefName}}\" *ngIf=\"row.ObjectName== 'Service Resource' || row.ObjectName== 'Attachment (Service Resource)' || row.ObjectName== 'Note (Service Resource)'\">\r\n                <a class=\" view-list\" [routerLink]=\"['/serviceresource/view/',row.ObjectId]\" href=\"javascript:void(0);\" [title]=\"row.ObjectRefName\">{{row.ObjectRefName| truncate : 50 }}</a>\r\n              </div>\r\n              <div title=\"{{row.ObjectRefName}}\" *ngIf=\"row.ObjectName== 'Service Crew' || row.ObjectName== 'Attachment (Service Crew)' || row.ObjectName== 'Note (Service Crew)'\">\r\n                <a class=\" view-list\" [routerLink]=\"['/servicecrew/view/',row.ObjectId]\" href=\"javascript:void(0);\" [title]=\"row.ObjectRefName\">{{row.ObjectRefName| truncate : 50 }}</a>\r\n              </div>\r\n              <div title=\"{{row.ObjectRefName}}\" *ngIf=\"row.ObjectName== 'Note (Loan Application)'\">\r\n                <a class=\" view-list\" [routerLink]=\"['/loanApplication/Detail/',row.ObjectId]\" href=\"javascript:void(0);\" [title]=\"row.ObjectRefName\">{{row.ObjectRefName| truncate : 50 }}</a>\r\n              </div>\r\n              <div title=\"{{row.ObjectRefName}}\" *ngIf=\"row.ObjectName== 'ProductMaster' || row.ObjectName== 'Attachment (ProductMaster)' || row.ObjectName== 'Note (ProductMaster)'\">\r\n                <a class=\" view-list\" [routerLink]=\"['/product/viewproducts/',row.ObjectId]\" href=\"javascript:void(0);\" [title]=\"row.ObjectRefName\">{{row.ObjectRefName| truncate : 50 }}</a>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Sync Status\" prop=\"Error\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div title=\"{{row.Error}}\">\r\n                {{row.Error}}\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Created Date\" prop=\"CREATED_AT\" [sortable]=\"true\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div title=\"{{(row.CREATED_AT | DateTimeToLocal)}}\">\r\n                {{ (row.CREATED_AT !== null) ? (row.CREATED_AT | DateTimeToLocal) : \"\" }}\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Created By\" prop=\"CreatedByName\" [sortable]=\"true\"></ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"pagedData.pager.currentPage+1\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\" *ngIf='(rowCount  > 0)'>\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                {{commonService.PageString(pagedData.pager.currentPage+1,pagedData.pager.pageSize,rowCount)}}\r\n\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                               [page]=\"pagedData.pager.currentPage+1\"\r\n                               [size]=\"pagedData.pager.pageSize\"\r\n                               [count]=\"pagedData.pager.totalItems\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n\r\n\r\n\r\n\r\n");

/***/ }),

/***/ "./src/app/views/salesforcesyncobject/saleforcesyncstatus-routing.module.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/views/salesforcesyncobject/saleforcesyncstatus-routing.module.ts ***!
  \**********************************************************************************/
/*! exports provided: SaleforcesyncstatusRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SaleforcesyncstatusRoutingModule", function() { return SaleforcesyncstatusRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _saleforcesyncstatuslist_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./saleforcesyncstatuslist.component */ "./src/app/views/salesforcesyncobject/saleforcesyncstatuslist.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
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
    { path: '', component: _saleforcesyncstatuslist_component__WEBPACK_IMPORTED_MODULE_1__["SaleforcesyncstatuslistComponent"] },
];
var SaleforcesyncstatusRoutingModule = /** @class */ (function () {
    function SaleforcesyncstatusRoutingModule() {
    }
    SaleforcesyncstatusRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], SaleforcesyncstatusRoutingModule);
    return SaleforcesyncstatusRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/salesforcesyncobject/saleforcesyncstatus.module.ts":
/*!**************************************************************************!*\
  !*** ./src/app/views/salesforcesyncobject/saleforcesyncstatus.module.ts ***!
  \**************************************************************************/
/*! exports provided: SaleforceSyncStatusModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SaleforceSyncStatusModule", function() { return SaleforceSyncStatusModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _saleforcesyncstatuslist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./saleforcesyncstatuslist.component */ "./src/app/views/salesforcesyncobject/saleforcesyncstatuslist.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! primeng/calendar */ "./node_modules/primeng/calendar.js");
/* harmony import */ var primeng_calendar__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(primeng_calendar__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _saleforcesyncstatus_routing_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./saleforcesyncstatus-routing.module */ "./src/app/views/salesforcesyncobject/saleforcesyncstatus-routing.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};










var SaleforceSyncStatusModule = /** @class */ (function () {
    function SaleforceSyncStatusModule() {
    }
    SaleforceSyncStatusModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_saleforcesyncstatuslist_component__WEBPACK_IMPORTED_MODULE_2__["SaleforcesyncstatuslistComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _saleforcesyncstatus_routing_module__WEBPACK_IMPORTED_MODULE_9__["SaleforcesyncstatusRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["NgxDatatableModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"], primeng_calendar__WEBPACK_IMPORTED_MODULE_6__["CalendarModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__["ModalModule"]
            ]
        })
    ], SaleforceSyncStatusModule);
    return SaleforceSyncStatusModule;
}());



/***/ }),

/***/ "./src/app/views/salesforcesyncobject/saleforcesyncstatus.service.ts":
/*!***************************************************************************!*\
  !*** ./src/app/views/salesforcesyncobject/saleforcesyncstatus.service.ts ***!
  \***************************************************************************/
/*! exports provided: SaleforcesyncstatusService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SaleforcesyncstatusService", function() { return SaleforcesyncstatusService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
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




var SaleforcesyncstatusService = /** @class */ (function () {
    function SaleforcesyncstatusService(http) {
        this.http = http;
        this.baseUri = "" + _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].WebApiBaseUrl;
    }
    SaleforcesyncstatusService.prototype.getSaleforceSyncStatusList = function (objectName, name, createdByName, startDate, endDate, sortColumn, sortDir, page, pageSize) {
        var _this = this;
        if (typeof name == "undefined" || name == null) {
            name = null;
        }
        else {
            name = encodeURIComponent((name));
        }
        return this.http.get(this.baseUri + "SalesforceSyncObject/GetSalesforceSyncObjectList?objectName=" + objectName + "&name=" + name + "&createdByName=" + createdByName + "&startDate=" + startDate + "&endDate=" + endDate + "&sortColumn=" + sortColumn + "&sortDir=" + sortDir + "&page=" + page + "&pageSize=" + pageSize)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (response) {
            _this.pagedData = response;
            return true;
        }));
    };
    SaleforcesyncstatusService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
    ]; };
    SaleforcesyncstatusService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], SaleforcesyncstatusService);
    return SaleforcesyncstatusService;
}());



/***/ }),

/***/ "./src/app/views/salesforcesyncobject/saleforcesyncstatuslist.component.scss":
/*!***********************************************************************************!*\
  !*** ./src/app/views/salesforcesyncobject/saleforcesyncstatuslist.component.scss ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL3NhbGVzZm9yY2VzeW5jb2JqZWN0L3NhbGVmb3JjZXN5bmNzdGF0dXNsaXN0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "./src/app/views/salesforcesyncobject/saleforcesyncstatuslist.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/views/salesforcesyncobject/saleforcesyncstatuslist.component.ts ***!
  \*********************************************************************************/
/*! exports provided: SaleforcesyncstatuslistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SaleforcesyncstatuslistComponent", function() { return SaleforcesyncstatuslistComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _saleforcesyncstatus_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./saleforcesyncstatus.service */ "./src/app/views/salesforcesyncobject/saleforcesyncstatus.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../pipes/datetime.pipe */ "./src/app/pipes/datetime.pipe.ts");
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








var SaleforcesyncstatuslistComponent = /** @class */ (function () {
    function SaleforcesyncstatuslistComponent(saleforcesyncstatusService, commonService, router, location, dateTimeToLocal) {
        var _this = this;
        this.saleforcesyncstatusService = saleforcesyncstatusService;
        this.commonService = commonService;
        this.router = router;
        this.location = location;
        this.dateTimeToLocal = dateTimeToLocal;
        this.loadSave = false;
        this.sortDir = 'desc';
        this.sortColumn = 'CREATED_AT';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.CreatedByFilter = '';
        this.objectNameFilter = '';
        this.startDate = null;
        this.endDate = null;
        this.searchTxt = '';
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["SelectionType"];
        this.selected = [];
        this.pageSize = 15;
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
            _this.companyId = userdetail.companyId;
            _this.companyType = userdetail.companyType;
        });
    }
    SaleforcesyncstatuslistComponent.prototype.ngOnInit = function () {
        this.pageSizeValue = 15;
        this.currentPage = 0;
        this.pageSizeValue = 15;
        this.getPageSizes();
        this.search();
    };
    SaleforcesyncstatuslistComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    SaleforcesyncstatuslistComponent.prototype.search = function () {
        this.loadSave = true;
        this.refresh();
    };
    SaleforcesyncstatuslistComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    SaleforcesyncstatuslistComponent.prototype.updateCreatedByFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    SaleforcesyncstatuslistComponent.prototype.updateObjectNameFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    SaleforcesyncstatuslistComponent.prototype.onChange = function ($event) {
        this.currentPage = 0;
        this.refresh();
    };
    SaleforcesyncstatuslistComponent.prototype.reset = function () {
        this.table.sorts = [];
        this.loadSave = true;
        this.listFilter = '';
        this.sortDir = 'desc';
        this.sortColumn = 'CREATED_AT';
        this.currentPage = 0;
        this.pageSizeValue = 15;
        this.CreatedByFilter = '';
        this.objectNameFilter = '';
        this.startDate = null;
        this.endDate = null;
        this.refresh();
    };
    SaleforcesyncstatuslistComponent.prototype.setPage = function ($event) {
        this.loadSave = true;
        this.currentPage = $event.page - 1;
        this.refresh();
    };
    SaleforcesyncstatuslistComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.loadSave = true;
        this.currentPage = 0;
        this.refresh();
    };
    SaleforcesyncstatuslistComponent.prototype.refresh = function () {
        var _this = this;
        this.loadSave = true;
        var startDate = '', endDate = '';
        if (this.startDate) {
            startDate = moment__WEBPACK_IMPORTED_MODULE_5___default()(this.startDate.toString()).format('YYYY-MM-DD');
        }
        if (this.endDate) {
            endDate = moment__WEBPACK_IMPORTED_MODULE_5___default()(this.endDate.toString()).format('YYYY-MM-DD');
        }
        this.saleforcesyncstatusService.getSaleforceSyncStatusList(this.objectNameFilter.trim(), this.listFilter.trim(), this.CreatedByFilter.trim(), startDate, endDate, this.sortColumn, this.sortDir, this.currentPage, this.pageSizeValue).subscribe(function (response) {
            _this.pagedData = _this.saleforcesyncstatusService.pagedData;
            for (var item in _this.pagedData.data) {
                //debugger;
                var child = _this.pagedData.data[item];
                for (var innerChild in child) {
                    if (innerChild == 'CREATED_AT') {
                        child[innerChild] = moment__WEBPACK_IMPORTED_MODULE_5___default()(child[innerChild]).format('MM/DD/YYYY hh:mm:ss A');
                    }
                }
            }
            // console.log(" this.saleforcesyncstatusService.pagedData", this.saleforcesyncstatusService.pagedData);
            //this.loadSave = false;
            //this.location.back();
        }, function (error) {
            setTimeout(function () { _this.loadSave = false; }, 3000);
        }, function () {
            setTimeout(function () { _this.loadSave = false; }, 3000);
        });
    };
    SaleforcesyncstatuslistComponent.ctorParameters = function () { return [
        { type: _saleforcesyncstatus_service__WEBPACK_IMPORTED_MODULE_1__["SaleforcesyncstatusService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"] },
        { type: _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_7__["DateTimeToLocalPipe"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('table', { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["DatatableComponent"])
    ], SaleforcesyncstatuslistComponent.prototype, "table", void 0);
    SaleforcesyncstatuslistComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-saleforcesyncstatuslist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./saleforcesyncstatuslist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/salesforcesyncobject/saleforcesyncstatuslist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./saleforcesyncstatuslist.component.scss */ "./src/app/views/salesforcesyncobject/saleforcesyncstatuslist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_saleforcesyncstatus_service__WEBPACK_IMPORTED_MODULE_1__["SaleforcesyncstatusService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"], _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_7__["DateTimeToLocalPipe"]])
    ], SaleforcesyncstatuslistComponent);
    return SaleforcesyncstatuslistComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-salesforcesyncobject-saleforcesyncstatus-module.js.map